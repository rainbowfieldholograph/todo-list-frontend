import { useAtom } from '@reatom/npm-react';
import {
	currentTodoSortAtom,
	TodoSortKey,
	todoSortVariants,
} from '../../../model';
import { ChangeEventHandler, CSSProperties } from 'react';

const optionsEntries = Object.entries(todoSortVariants);

type TodoSortProps = {
	className?: string;
	style?: CSSProperties;
};

export const TodoSort = ({ className, style }: TodoSortProps) => {
	const [currentSort, changeSort] = useAtom(currentTodoSortAtom);

	const [selectValue] = optionsEntries.find(([_, value]) => {
		if (currentSort === value) return true;
		if (!currentSort || !value) return false;

		return currentSort.field === value.field && currentSort.type === value.type;
	})!;

	const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
		const selectedSort = event.target.value as TodoSortKey;

		changeSort(todoSortVariants[selectedSort]);
	};

	return (
		<select
			className={className}
			style={style}
			onChange={handleChange}
			value={selectValue}
		>
			{optionsEntries.map(([key]) => (
				<option value={key} key={key}>
					{key}
				</option>
			))}
		</select>
	);
};
