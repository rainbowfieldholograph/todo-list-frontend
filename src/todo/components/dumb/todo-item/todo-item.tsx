import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { withSlot } from '~/shared/lib/hocs';
import styles from './todo-item.module.css';

type TodoItemProps = {
	title: string;
	description: string;
	completed: boolean;
	actionsStartSlot?: ReactNode;
	actionsEndSlot?: ReactNode;
};

const Title = (props: ComponentProps<'h3'>) => <h3 {...props} />;
const TodoItemSlot = { Title };
export const TodoItem = withSlot<typeof TodoItemSlot, TodoItemProps>(
	TodoItemSlot,
	({
		slot,
		completed,
		description,
		title,
		actionsEndSlot,
		actionsStartSlot,
	}) => {
		return (
			<article className={clsx(styles.todo, { [styles.completed]: completed })}>
				<div className={styles.meta}>
					<slot.Title>{title}</slot.Title>
					<p>{description}</p>
				</div>
				<div className={styles.actionsContainer}>
					<div className={styles.actions}>{actionsStartSlot}</div>
					<div className={styles.actions}>{actionsEndSlot}</div>
				</div>
			</article>
		);
	},
);

TodoItem.displayName = 'TodoItem';
