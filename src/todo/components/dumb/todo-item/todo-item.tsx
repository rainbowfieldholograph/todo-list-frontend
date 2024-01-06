import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './todo-item.module.css';

type TodoItemProps = {
	title: string;
	description: string;
	completed: boolean;
	endVerticalSlot: ReactNode;
	actionsSlot: ReactNode;
};

export const TodoItem = ({
	completed,
	description,
	title,
	endVerticalSlot,
	actionsSlot,
}: TodoItemProps) => {
	return (
		<article className={clsx(styles.todo, { [styles.completed]: completed })}>
			<div>
				<div className={styles.meta}>
					<h3>{title}</h3>
					<p className={styles.description}>{description}</p>
				</div>
				<div className={styles.actions}>{actionsSlot}</div>
			</div>
			<div className={styles.endVerticalSection}>{endVerticalSlot}</div>
		</article>
	);
};
