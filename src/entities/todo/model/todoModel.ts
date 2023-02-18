import {
	reatomAsync,
	withErrorAtom,
	onConnect,
	withDataAtom,
	AsyncAction,
	onDisconnect,
	withReset,
} from '@reatom/framework';
import { TodoDto } from '../types';
import { deleteTodo, getTodos, postTodo, toggleCompletedTodo } from '../api';
import { updateTodoData } from '../api/updateTodoData';
import { removeSameFieldValues } from 'shared/lib/utils';

export type Todo = TodoDto & {
	remove: AsyncAction;
	toggle: AsyncAction;
	update: AsyncAction<[updateData: Pick<TodoDto, 'description' | 'title'>]>;
};

const initialTodos = [] satisfies Todo[];

const createTodoReatom = (todoToCreate: TodoDto): Todo => {
	const todo = {
		...todoToCreate,
		remove: reatomAsync(async (ctx) => {
			await deleteTodo(todoToCreate._id);

			onFetchTodos.dataAtom(ctx, (todos) => {
				return todos.filter((todo) => todo._id !== todoToCreate._id);
			});
		}),
		toggle: reatomAsync(async (ctx) => {
			const toggledTodo = ctx
				.get(onFetchTodos.dataAtom)
				.find((todo) => todo._id === todoToCreate._id)!;

			await toggleCompletedTodo(todoToCreate._id, !toggledTodo.completed);

			onFetchTodos.dataAtom(ctx, (todos) => {
				return todos.map((todo) => {
					return todo._id === todoToCreate._id
						? { ...todo, completed: !todo.completed }
						: todo;
				});
			});
		}),
		update: reatomAsync(
			async (ctx, updateData: Pick<TodoDto, 'description' | 'title'>) => {
				const actualTodoToCreate = ctx
					.get(onFetchTodos.dataAtom)
					.find(({ _id }) => _id === todoToCreate._id)!;

				const dataToUpdate = removeSameFieldValues(
					actualTodoToCreate,
					updateData,
				);

				if (!dataToUpdate) return;

				const { data: updatedTodo } = await updateTodoData(
					todoToCreate._id,
					dataToUpdate,
				);

				onFetchTodos.dataAtom(ctx, (todos) => {
					return todos.map((todo) => {
						return updatedTodo._id === todo._id
							? {
									...todo,
									description: updatedTodo.description,
									title: updatedTodo.title,
							  }
							: todo;
					});
				});
			},
		),
	} satisfies Todo;

	return todo;
};

export const onFetchTodos = reatomAsync(async () => {
	const { data: todos } = await getTodos();

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

export const onToggleTodo = reatomAsync(async (ctx, todoId: TodoDto['_id']) => {
	const todoToToggle = ctx
		.get(onFetchTodos.dataAtom)
		.find(({ _id }) => _id === todoId);

	if (!todoToToggle) return;

	await toggleCompletedTodo(todoId, !todoToToggle.completed);

	onFetchTodos.dataAtom(ctx, (prevTodos) => {
		return prevTodos.map((todo) => {
			return todo._id === todoId
				? { ...todo, completed: !todo.completed }
				: todo;
		});
	});
});

onConnect(onFetchTodos.dataAtom, (ctx) => {
	ctx.schedule(async () => {
		const { data: todos } = await getTodos();
		const todosToApply = todos.map(createTodoReatom);

		onFetchTodos.dataAtom(ctx, todosToApply);
	});
});

onDisconnect(onFetchTodos.dataAtom, onFetchTodos.dataAtom.reset);
