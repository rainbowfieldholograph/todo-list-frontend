import type { ChangeEventHandler, CSSProperties } from 'react';
import { useAtom } from '@reatom/npm-react';
import { todoSortVariants, type TodoSortKey } from '~/todo/config';
import { todoSortAtom } from '../../../model';

const optionsEntries = Object.entries(todoSortVariants);

type TodoSortProps = {
	className?: string;
	style?: CSSProperties;
};

export const TodoSort = ({ className, style }: TodoSortProps) => {
	const [currentSort, changeSort] = useAtom(todoSortAtom);

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
