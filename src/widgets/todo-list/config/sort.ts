import { TodoDto } from 'entities/todo';

export const sortVariants = [
	'Default',
	'Name A-Z',
	'Name Z-A',
	'Description A-Z',
	'Description Z-A',
	'Completion',
] as const;

export type SortType = (typeof sortVariants)[number];

type SortFunction = {
	[key in Exclude<SortType, 'Default'>]: (a: TodoDto, b: TodoDto) => number;
};

export const SORT_FUNCTIONS: SortFunction = {
	'Name A-Z': (a, b) => {
		return a.title.localeCompare(b.title);
	},
	'Name Z-A': (a, b) => {
		return a.title.localeCompare(b.title) * -1;
	},
	Completion: (a, b) => {
		return +a.completed - +b.completed;
	},
	'Description A-Z': (a, b) => {
		return a.description.localeCompare(b.description);
	},
	'Description Z-A': (a, b) => {
		return a.description.localeCompare(b.description) * -1;
	},
};
