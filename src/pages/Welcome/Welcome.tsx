import { FC } from 'react';
import { StackList } from './ui';
import styles from './Welcome.module.css';

export const Welcome: FC = () => {
	return (
		<div>
			<h2 className={styles.title}>Fullstack Todo List w/ auth</h2>
			<div className={styles.info}>
				<p>Welcome, This is fullstack Todo list application.</p>
				<p>{"I'm just trying some new technologies ;)"}</p>
			</div>
			<StackList />
		</div>
	);
};
