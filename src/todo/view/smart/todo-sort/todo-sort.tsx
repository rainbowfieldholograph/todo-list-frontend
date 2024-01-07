import type { ChangeEventHandler } from 'react';
import { useAtom } from '@reatom/npm-react';
import { todoSortVariants, type TodoSortKey } from '~/todo/config';
import { todoSortAtom, todosResource } from '../../../model';

const optionsEntries = Object.entries(todoSortVariants);

export const TodoSort = () => {
	const [currentSort, changeSort] = useAtom(todoSortAtom);
	const [loading] = useAtom(
		(ctx) => ctx.spy(todosResource.statusesAtom).isPending,
	);

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
		<select disabled={loading} onChange={handleChange} value={selectValue}>
			{optionsEntries.map(([key]) => (
				<option value={key} key={key}>
					{key}
				</option>
			))}
		</select>
	);
};
