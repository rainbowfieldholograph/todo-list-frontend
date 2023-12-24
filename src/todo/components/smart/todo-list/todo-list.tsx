import { useAtom } from '@reatom/npm-react';
import { todosResource } from '../../../model';
import { TodoList as TodoListDumb } from '../../dumb';
import { TodoItem } from './todo-item';

export const TodoList = () => {
	const [todos] = useAtom(todosResource.dataAtom);
	const [loading] = useAtom(
		(ctx) => ctx.spy(todosResource.statusesAtom).isPending,
	);
	const todoListEmpty = todos.length === 0;

	if (loading) return <p>Todos loading...</p>;
	if (todoListEmpty) return <p>{"You don't have todo's yet"}</p>;

	return (
		<TodoListDumb>
			{todos.map((todo) => (
				<TodoItem key={todo._id} {...todo} />
			))}
		</TodoListDumb>
	);
};
