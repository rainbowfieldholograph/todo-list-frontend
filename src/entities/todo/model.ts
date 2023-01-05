import { atom, action, reatomAsync, withErrorAtom } from '@reatom/framework';
import { Todo } from 'shared/types';
import { deleteTodo, postTodo, toggleCompletedTodo } from 'shared/api';

const initialTodos: Todo[] = [];
const todosAtom = atom(initialTodos, 'userTodosAtom');

const resetTodosAction = action((ctx) => {
  todosAtom(ctx, initialTodos);
}, 'resetTodosAction');

const removeTodoAction = reatomAsync(async (ctx, todoId: Todo['_id']) => {
  await deleteTodo(todoId);

  const filtered = ctx.get(todosAtom).filter((todo) => todo._id !== todoId);
  todosAtom(ctx, filtered);
});

type CreateTodoArgs = Pick<Todo, 'title' | 'description'>;

const createTodoAction = reatomAsync(async (ctx, todoToCreate: CreateTodoArgs) => {
  const createTodoResponse = await postTodo(todoToCreate);

  const { data: createdTodo } = createTodoResponse;

  todosAtom(ctx, (prevTodos) => [...prevTodos, createdTodo]);
}).pipe(
  withErrorAtom((ctx, error) => {
    if (error instanceof Response) {
      return error.status;
    }

    if (error instanceof Error) {
      return error?.message ?? 'unknown error';
    }
  })
);

const toggleTodoAction = reatomAsync(async (ctx, todoId: Todo['_id']) => {
  const todoToToggle = ctx.get(todosAtom).find(({ _id }) => _id === todoId);

  if (!todoToToggle) return;

  try {
    await toggleCompletedTodo(todoId, !todoToToggle.completed);

    todosAtom(ctx, (prevTodos) => {
      return prevTodos.map((todo) => {
        return todo._id === todoId ? { ...todo, completed: !todo.completed } : todo;
      });
    });
  } catch (error) {
    console.error(error);
  }
});

export {
  createTodoAction,
  removeTodoAction,
  resetTodosAction,
  toggleTodoAction,
  todosAtom as userTodosAtom,
};
