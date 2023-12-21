import {
	reatomAsync,
	withErrorAtom,
	onConnect,
	withDataAtom,
	onDisconnect,
	withReset,
	atom,
	onUpdate,
	withAbort,
	withStatusesAtom,
} from '@reatom/framework';
import { TodoDTO } from '../types';
import { currentTodoSortAtom } from './sort';
import * as api from '../api';

const initialTodos = [] satisfies Todo[];

const createTodoReatom = (todoToCreate: TodoDTO) => {
	const titleAtom = atom(todoToCreate.title, 'titleAtom');
	const descriptionAtom = atom(todoToCreate.description, 'descriptionAtom');
	const completedAtom = atom(todoToCreate.completed, 'completedAtom');

	const remove = reatomAsync(async (ctx) => {
		await api.deleteTodo(todoToCreate._id);

		getTodos.dataAtom(ctx, (todos) =>
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
		...todoToCreate,
		titleAtom,
		descriptionAtom,
		completedAtom,
		remove,
		toggle,
		updateDescription,
		updateTitle,
	};
};

export type Todo = ReturnType<typeof createTodoReatom>;

export const getTodos = reatomAsync(async (ctx) => {
	const sort = ctx.get(currentTodoSortAtom);

	const { data: todos } = await api.getTodos(
		sort ? { sortBy: sort.field, sortType: sort.type } : null,
	);

	return todos.map(createTodoReatom);
}, 'getTodos').pipe(withDataAtom(initialTodos), withReset());

type CreateTodoArgs = Pick<TodoDTO, 'title' | 'description'>;

export const createTodo = reatomAsync(
	async (ctx, todoToCreate: CreateTodoArgs) => {
		const createTodoResponse = await api.postTodo(todoToCreate);

		const { data: createdTodo } = createTodoResponse;
		const todoToPush = createTodoReatom(createdTodo);

		getTodos.dataAtom(ctx, (prevTodos) => [...prevTodos, todoToPush]);
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

onConnect(getTodos.dataAtom, getTodos);
onDisconnect(getTodos.dataAtom, getTodos.dataAtom.reset);
onUpdate(currentTodoSortAtom, getTodos);
