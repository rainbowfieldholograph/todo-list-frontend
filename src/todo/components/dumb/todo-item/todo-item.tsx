import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './todo-item.module.css';

type TodoItemProps = {
	title: string;
	description: string;
	completed: boolean;

	actionsStartSlot?: ReactNode;
	actionsEndSlot?: ReactNode;
};

export const TodoItem = ({
	completed,
	description,
	title,
	actionsEndSlot,
	actionsStartSlot,
}: TodoItemProps) => {
	return (
		<article className={clsx(styles.todo, { [styles.completed]: completed })}>
			<div className={styles.meta}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div className={styles.actionsContainer}>
				<div className={styles.actions}>{actionsStartSlot}</div>
				<div className={styles.actions}>{actionsEndSlot}</div>
			</div>
		</article>
	);
};
