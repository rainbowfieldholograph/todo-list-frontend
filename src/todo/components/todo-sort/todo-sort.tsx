import { SortType, sortVariants } from '../../config';
import { ChangeEvent } from 'react';
import { useAtom } from '@reatom/npm-react';
import { todoSortAtom } from '../../model';
import styles from './todo-sort.module.css';

export const TodoSort = () => {
	const [_, setTodoSort] = useAtom(todoSortAtom);

	const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value as SortType;
		setTodoSort(value);
	};

	const options = sortVariants.map((option) => {
		return (
			<option key={option} value={option}>
				{option}
			</option>
		);
	});

	return (
		<select onChange={handleSelect} className={styles.filter}>
			{options}
		</select>
	);
};
