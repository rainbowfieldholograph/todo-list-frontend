import { useAtom } from '@reatom/npm-react';
import { todosResource } from '../../../model';
import { TodoItem } from './todo-item';
import styles from './todo-list.module.css';

const NoTodos = () => {
	return (
		<div>
			<p>{"You don't have todo's yet"}</p>
		</div>
	);
};

export const TodoList = () => {
	const [todos] = useAtom(todosResource.dataAtom);
	const [loading] = useAtom(
		(ctx) => ctx.spy(todosResource.statusesAtom).isPending,
	);
	const todoListEmpty = todos.length === 0;

	if (loading) return <p>Todos loading...</p>;

	if (todoListEmpty) return <NoTodos />;

	const listItems = todos.map((todo) => (
		<li key={todo._id}>
			<TodoItem {...todo} />
		</li>
	));

	return <ul className={styles.list}>{listItems}</ul>;
};
