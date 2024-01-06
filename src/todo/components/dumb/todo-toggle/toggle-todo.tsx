import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { withSlot } from '~/shared/lib/hocs';
import styles from './toggle-todo.module.css';

type ToggleTodoProps = {
	completed: boolean;
	onToggle: () => void;
	loading: boolean;
};

const ToggleTodoSlot = {
	Label: (props: ComponentPropsWithoutRef<'span'>) => {
		return (
			<span className={clsx(styles.title, props.className)}>
				is completed:{' '}
			</span>
		);
	},
};
export const ToggleTodo = withSlot<typeof ToggleTodoSlot, ToggleTodoProps>(
	ToggleTodoSlot,
	({ completed, onToggle, loading, slot }) => {
		return (
			<label>
				<slot.Label />
				<input
					disabled={loading}
					checked={completed}
					onChange={onToggle}
					type="checkbox"
				/>
			</label>
		);
	},
);
