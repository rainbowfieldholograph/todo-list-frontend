import { TodoDto } from './todoDto';

export type SortFields = keyof Pick<
	TodoDto,
	'completed' | 'description' | 'title'
>;
export type SortTypes = 'asc' | 'desc';
