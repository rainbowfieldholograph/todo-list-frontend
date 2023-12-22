import styles from './stack-item.module.css';

type StackItemProps = {
	title: string;
	items: string[];
};

export const StackItem = ({ items, title }: StackItemProps) => {
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
