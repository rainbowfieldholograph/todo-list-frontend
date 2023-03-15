import {
	reatomAsync,
	withErrorAtom,
	onConnect,
	withDataAtom,
	AsyncAction,
	onDisconnect,
	withReset,
	atom,
	AtomMut,
	onUpdate,
} from '@reatom/framework';
import { TodoDto } from '../types';
import {
	deleteTodo,
	getTodos,
	postTodo,
	toggleCompletedTodo,
	updateTodoData,
} from '../api';
import { removeSameFieldValues } from 'shared/lib/utils';
import { currentTodoSort } from './todoSort';

export type Todo = Omit<TodoDto, 'title' | 'description' | 'completed'> & {
	title: AtomMut<TodoDto['title']>;
	description: AtomMut<TodoDto['description']>;
	completed: AtomMut<TodoDto['completed']>;
	remove: AsyncAction;
	toggle: AsyncAction;
	update: AsyncAction<[updateData: Pick<TodoDto, 'description' | 'title'>]>;
};

type FieldsToUpdate = 'title' | 'description';

const initialTodos = [] satisfies Todo[];

const createTodoReatom = (todoToCreate: TodoDto): Todo => {
	const reatomTodo = {
		...todoToCreate,
		title: atom(todoToCreate.title, 'todo.titleAtom'),
		description: atom(todoToCreate.description, 'todo.descriptionAtom'),
		completed: atom(todoToCreate.completed, 'todo.completedAtom'),
		remove: reatomAsync(async (ctx) => {
			await deleteTodo(todoToCreate._id);

			onFetchTodos.dataAtom(ctx, (todos) => {
				return todos.filter(({ _id }) => _id !== reatomTodo._id);
			});
		}),
		toggle: reatomAsync(async (ctx) => {
			const updatedCompletion = !ctx.get(reatomTodo.completed);

			await toggleCompletedTodo(todoToCreate._id, updatedCompletion);

			reatomTodo.completed(ctx, updatedCompletion);
		}),
		update: reatomAsync(
			async (ctx, updateData: Pick<TodoDto, FieldsToUpdate>) => {
				const actualTodoToUpdate: Partial<Pick<TodoDto, FieldsToUpdate>> = {};

				for (const key of Object.keys(updateData)) {
					actualTodoToUpdate[key as FieldsToUpdate] = ctx.get(
						reatomTodo[key as FieldsToUpdate],
					);
				}

				const dataToUpdate = removeSameFieldValues(
					actualTodoToUpdate,
					updateData,
				);

				if (!dataToUpdate) return;

				await updateTodoData(todoToCreate._id, dataToUpdate);

				ctx.get(() => {
					for (const [key, value] of Object.entries(dataToUpdate)) {
						reatomTodo[key as FieldsToUpdate](ctx, value);
					}
				});
			},
		),
	} satisfies Todo;

	return reatomTodo;
};

export const onFetchTodos = reatomAsync(async (ctx) => {
	const sort = ctx.get(currentTodoSort);

	const { data: todos } = await getTodos(sort && { sort });

	return todos.map(createTodoReatom);
}).pipe(withDataAtom(initialTodos), withReset());

type CreateTodoArgs = Pick<TodoDto, 'title' | 'description'>;

export const onCreateTodo = reatomAsync(
	async (ctx, todoToCreate: CreateTodoArgs) => {
		const createTodoResponse = await postTodo(todoToCreate);

		const { data: createdTodo } = createTodoResponse;
		const todoToPush = createTodoReatom(createdTodo);

		onFetchTodos.dataAtom(ctx, (prevTodos) => [...prevTodos, todoToPush]);
	},
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

onConnect(onFetchTodos.dataAtom, (ctx) => ctx.schedule(onFetchTodos));

onDisconnect(onFetchTodos.dataAtom, onFetchTodos.dataAtom.reset);

onUpdate(currentTodoSort, onFetchTodos);
