import { TodoDto } from './todo.dto';

export type SortField = keyof Pick<
	TodoDto,
	'completed' | 'description' | 'title'
>;
export type SortType = 'asc' | 'desc';
