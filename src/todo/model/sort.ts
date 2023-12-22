import { atom } from '@reatom/framework';
import type { SortBy, SortType } from '../types';

type SortVariantValue = { field: SortBy; type: SortType } | null;
type TodoSortVariantsType = { [key: string]: SortVariantValue };

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

export type TodoSortVariant = (typeof todoSortVariants)[TodoSortKey];
export type TodoSortKey = keyof typeof todoSortVariants;

export const currentTodoSortAtom = atom<TodoSortVariant>(
	null,
	'currentTodoSortAtom',
);
