import { FC } from 'react';
import styles from './StackItem.module.css';

type StackItemProps = {
	title: string;
	items: string[];
};

export const StackItem: FC<StackItemProps> = ({ items, title }) => {
	const listItems = items.map((item, index) => {
		return <li key={index}>{item}</li>;
	});

	return (
		<div>
			<h3 className={styles.title}>{title}</h3>
			<ul>{listItems}</ul>
		</div>
	);
};
