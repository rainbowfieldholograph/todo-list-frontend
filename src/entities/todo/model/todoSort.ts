import { atom } from '@reatom/framework';
import { SortFields, SortTypes } from '../types';

type SortVariantValue = {
	field: SortFields;
	type: SortTypes;
} | null;

type TodoSortVariantsType = {
	[key: string]: SortVariantValue;
};

export const todoSortVariants = {
	Default: null,
	'Title (A-Z)': {
		field: 'title',
		type: 'asc',
	},
	'Title (Z-A)': {
		field: 'title',
		type: 'desc',
	},
	'Description (A-Z)': {
		field: 'description',
		type: 'asc',
	},
	'Description (Z-A)': {
		field: 'description',
		type: 'desc',
	},
	'Checked (Unchecked -> Checked)': {
		field: 'completed',
		type: 'asc',
	},
	'Checked (Checked -> Unchecked)': {
		field: 'completed',
		type: 'desc',
	},
} as const satisfies TodoSortVariantsType;

type TodoSortVariant = (typeof todoSortVariants)[TodoSortKeys];

export type TodoSortKeys = keyof typeof todoSortVariants;
export const currentTodoSort = atom<TodoSortVariant>(null);
