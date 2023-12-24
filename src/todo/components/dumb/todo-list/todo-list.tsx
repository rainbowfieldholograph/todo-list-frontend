import { Children, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './todo-list.module.css';

type TodoListProps = PropsWithChildren<{ loading?: boolean }>;

export const TodoList = ({ children, loading }: TodoListProps) => (
	<ul className={clsx({ [styles.loading]: loading }, styles.list)}>
		{Children.map(children, (child) => (
			<li>{child}</li>
		))}
	</ul>
);
