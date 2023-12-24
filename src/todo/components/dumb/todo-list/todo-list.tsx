import { Children, type PropsWithChildren } from 'react';
import styles from './todo-list.module.css';

export const TodoList = ({ children }: PropsWithChildren) => (
	<ul className={styles.list}>
		{Children.map(children, (child) => (
			<li>{child}</li>
		))}
	</ul>
);
