import styles from './toggle-todo.module.css';

type ToggleTodoProps = {
	completed: boolean;
	onToggle: () => void;
	loading: boolean;
	label?: string | null;
};

export const ToggleTodo = ({
	completed,
	onToggle,
	loading,
	label = 'is completed: ',
}: ToggleTodoProps) => {
	return (
		<label>
			<span className={styles.title}>{label}</span>
			<input
				disabled={loading}
				checked={completed}
				onChange={onToggle}
				type="checkbox"
			/>
		</label>
	);
};
