import { TodoDto } from './todoDto';

export type SortField = keyof Pick<
	TodoDto,
	'completed' | 'description' | 'title'
>;
export type SortType = 'asc' | 'desc';
