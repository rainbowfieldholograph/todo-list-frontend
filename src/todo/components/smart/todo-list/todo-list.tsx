import { useAtom } from '@reatom/npm-react';

import { getTodosResource } from '../../../model';
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
	const [todoItems] = useAtom(getTodosResource.dataAtom);
	const [loading] = useAtom(
		(ctx) => ctx.spy(getTodosResource.statusesAtom).isPending,
	);

	const todoListEmpty = todoItems.length === 0;

	if (loading) return <p>Todos loading...</p>;

	if (todoListEmpty) return <NoTodos />;

	const listItems = todoItems.map((todo) => (
		<li key={todo._id}>
			<TodoItem {...todo} />
		</li>
	));

	return <ul className={styles.list}>{listItems}</ul>;
};
