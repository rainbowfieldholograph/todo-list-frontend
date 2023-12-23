import {
	reatomAsync,
	withErrorAtom,
	withDataAtom,
	withReset,
	atom,
	withAbort,
	withStatusesAtom,
	reatomResource,
} from '@reatom/framework';
import type { TodoDTO } from '../types';
import * as api from '../api';
import { currentTodoSortAtom } from './sort';

const initialTodos = [] satisfies Todo[];

const reatomTodo = (todoToCreate: TodoDTO) => {
	const titleAtom = atom(todoToCreate.title, 'titleAtom');
	const descriptionAtom = atom(todoToCreate.description, 'descriptionAtom');
	const completedAtom = atom(todoToCreate.completed, 'completedAtom');

	const remove = reatomAsync(async (ctx) => {
		await api.deleteTodo(todoToCreate._id, { signal: ctx.controller.signal });

		getTodosResource.dataAtom(ctx, (todos) =>
			todos.filter(({ _id }) => _id !== todoToCreate._id),
		);
	}, 'remove').pipe(withAbort(), withStatusesAtom());

	const toggle = reatomAsync(async (ctx) => {
		const completed = !ctx.get(completedAtom);
		await api.updateTodo(
			todoToCreate._id,
			{ completed },
			{ signal: ctx.controller.signal },
		);
		completedAtom(ctx, completed);
	}, 'toggle').pipe(withAbort(), withStatusesAtom());

	const updateDescription = reatomAsync(async (ctx, description) => {
		const { data } = await api.updateTodo(
			todoToCreate._id,
			{ description },
			{ signal: ctx.controller.signal },
		);
		descriptionAtom(ctx, data.description);
	}, 'updateDescription').pipe(withAbort(), withStatusesAtom());

	const updateTitle = reatomAsync(async (ctx, title) => {
		const { data } = await api.updateTodo(
			todoToCreate._id,
			{ title },
			{ signal: ctx.controller.signal },
		);
		titleAtom(ctx, data.title);
	}, 'updateTitle').pipe(withAbort(), withStatusesAtom());

	return {
		creatorId: todoToCreate.creatorId,
		_id: todoToCreate._id,
		titleAtom,
		descriptionAtom,
		completedAtom,
		remove,
		toggle,
		updateDescription,
		updateTitle,
	};
};

export type Todo = ReturnType<typeof reatomTodo>;

export const getTodosResource = reatomResource(async (ctx) => {
	const sort = ctx.spy(currentTodoSortAtom);
	const { data: todos } = await api.getTodos(
		sort ? { sortBy: sort.field, sortType: sort.type } : null,
		{ signal: ctx.controller.signal },
	);

	return todos;
}, 'getTodosResource').pipe(
	withDataAtom(initialTodos, (_ctx, payload) => payload.map(reatomTodo)),
	withReset(),
	withStatusesAtom(),
);

type CreateTodoArgs = Pick<TodoDTO, 'title' | 'description'>;

export const createTodo = reatomAsync(
	async (ctx, todoToCreate: CreateTodoArgs) => {
		const { data: createdTodo } = await api.postTodo(todoToCreate);

		getTodosResource.dataAtom(ctx, (prevTodos) => [
			...prevTodos,
			reatomTodo(createdTodo),
		]);
	},
	'createTodo',
).pipe(
	withErrorAtom((ctx, error) => {
		if (error instanceof Response) {
			return error.status;
		}

		if (error instanceof Error) {
			return error?.message ?? 'unknown error';
		}
	}),
);
