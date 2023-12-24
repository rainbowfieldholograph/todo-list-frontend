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
import { errorMapper } from '~/shared/lib/utils';
import { isLoggedAtom } from '~/user/model';
import type { TodoSortVariant } from './config';
import type { TodoDTO } from './types';
import * as api from './api';

const initialTodos = [] satisfies Todo[];

const reatomTodo = (todoDTO: TodoDTO) => {
	const titleAtom = atom(todoDTO.title, 'titleAtom');
	const descriptionAtom = atom(todoDTO.description, 'descriptionAtom');
	const completedAtom = atom(todoDTO.completed, 'completedAtom');

	const remove = reatomAsync(async (ctx) => {
		await api.deleteTodo(todoDTO._id, { signal: ctx.controller.signal });

		todosResource.dataAtom(ctx, (todos) =>
			todos.filter(({ _id }) => _id !== todoDTO._id),
		);
	}, 'remove').pipe(withAbort(), withStatusesAtom());

	const toggle = reatomAsync(async (ctx) => {
		const completed = !ctx.get(completedAtom);
		await api.updateTodo(
			todoDTO._id,
			{ completed },
			{ signal: ctx.controller.signal },
		);
		completedAtom(ctx, completed);
	}, 'toggle').pipe(withAbort(), withStatusesAtom());

	const updateDescription = reatomAsync(async (ctx, description) => {
		const { data } = await api.updateTodo(
			todoDTO._id,
			{ description },
			{ signal: ctx.controller.signal },
		);
		descriptionAtom(ctx, data.description);
	}, 'updateDescription').pipe(withAbort(), withStatusesAtom());

	const updateTitle = reatomAsync(async (ctx, title) => {
		const { data } = await api.updateTodo(
			todoDTO._id,
			{ title },
			{ signal: ctx.controller.signal },
		);
		titleAtom(ctx, data.title);
	}, 'updateTitle').pipe(withAbort(), withStatusesAtom());

	return {
		creatorId: todoDTO.creatorId,
		_id: todoDTO._id,
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

export const todosResource = reatomResource(async (ctx) => {
	const sort = ctx.spy(todoSortAtom);
	const logged = ctx.spy(isLoggedAtom);

	if (!logged) todosResource.dataAtom.reset(ctx);

	const { data: todos } = await ctx.schedule(async () => {
		const todoSort = sort ? { sortBy: sort.field, sortType: sort.type } : null;
		return await api.getTodos(todoSort, { signal: ctx.controller.signal });
	});

	return todos;
}, 'todosResource').pipe(
	withDataAtom(initialTodos, (ctx, payload) => payload.map(reatomTodo)),
	withStatusesAtom(),
	withReset(),
);

type CreateTodoArgs = Pick<TodoDTO, 'title' | 'description'>;

export const createTodo = reatomAsync(
	async (ctx, todoToCreate: CreateTodoArgs) => {
		const { data: createdTodo } = await api.postTodo(todoToCreate);

		todosResource.dataAtom(ctx, (prevTodos) => [
			...prevTodos,
			reatomTodo(createdTodo),
		]);
	},
	'createTodo',
).pipe(withErrorAtom((ctx, error) => errorMapper(error)));

export const todoSortAtom = atom<TodoSortVariant>(null, 'todoSortAtom').pipe(
	withReset(),
);
