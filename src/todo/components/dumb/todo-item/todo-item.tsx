import type { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './todo-item.module.css';

type TodoItemProps = {
	description: string;
	completed: boolean;
	endVerticalSlot: ReactNode;
	actionsSlot: ReactNode;
	renderTitle: ({
		TitleComponent,
	}: {
		TitleComponent: ElementType;
	}) => ReactNode;
};

export const TodoItem = ({
	completed,
	description,
	// title,
	endVerticalSlot,
	actionsSlot,
	renderTitle,
}: TodoItemProps) => {
	return (
		<article className={clsx(styles.todo, { [styles.completed]: completed })}>
			<div>
				<div className={styles.meta}>
					{renderTitle({ TitleComponent: 'h3' })}
					<p className={styles.description}>{description}</p>
				</div>
				<div className={styles.actions}>{actionsSlot}</div>
			</div>
			<div className={styles.endVerticalSection}>{endVerticalSlot}</div>
		</article>
	);
};
