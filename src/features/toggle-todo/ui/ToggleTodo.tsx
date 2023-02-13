import { AsyncAction } from '@reatom/framework';
import { useAction, useAtom } from '@reatom/npm-react';
import { FC } from 'react';
import styles from './ToggleTodo.module.css';

type ToggleTodoProps = {
	completed: boolean;
	toggle: AsyncAction;
};

export const ToggleTodo: FC<ToggleTodoProps> = ({ completed, toggle }) => {
	const handleToggle = useAction(toggle);
	const [loading] = useAtom((ctx) => ctx.spy(toggle.pendingAtom) > 0);

	return (
		<label>
			<span className={styles.title}>is completed: </span>
			<input
				disabled={loading}
				checked={completed}
				onChange={handleToggle}
				type="checkbox"
			/>
		</label>
	);
};
