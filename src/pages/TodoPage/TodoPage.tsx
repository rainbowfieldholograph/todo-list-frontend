import { FC } from 'react';
import { TodoCreator } from 'todo/components/todo-creator';
import { SortTodo } from 'todo/components/sort-todo';
import { TodoList } from 'todo/components/todo-list';
import styles from './TodoPage.module.css';

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
