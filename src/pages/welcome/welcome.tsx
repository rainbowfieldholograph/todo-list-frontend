import { FC } from 'react';
import { StackList } from './stack-list';
import styles from './welcome.module.css';

export const Welcome: FC = () => {
	return (
		<>
			<h2 className={styles.title}>Fullstack Todo List w/ auth</h2>
			<div className={styles.info}>
				<p>Welcome, This is fullstack Todo list application.</p>
				<p>{"I'm just trying some new technologies ;)"}</p>
			</div>
			<StackList />
		</>
	);
};
