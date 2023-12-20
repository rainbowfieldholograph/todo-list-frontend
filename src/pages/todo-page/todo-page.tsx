import { FC } from 'react';
import { TodoCreator, SortTodo , TodoList } from 'todo/components';
import styles from './todo-page.module.css';

export const TodoPage: FC = () => {
	return (
		<>
			<h2 className={styles.title}>This is todo page</h2>
			<div className={styles.head}>
				<SortTodo />
				<TodoCreator />
			</div>
			<TodoList />
		</>
	);
};
