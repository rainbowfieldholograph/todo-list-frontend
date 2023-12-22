import type { FC } from 'react';
import styles from './toggle-todo.module.css';

type ToggleTodoProps = {
	completed: boolean;
	onToggle: () => void;
	loading: boolean;
};

export const ToggleTodo: FC<ToggleTodoProps> = ({
	completed,
	onToggle,
	loading,
}) => {
	return (
		<label>
			<span className={styles.title}>is completed: </span>
			<input
				disabled={loading}
				checked={completed}
				onChange={onToggle}
				type="checkbox"
			/>
		</label>
	);
};
