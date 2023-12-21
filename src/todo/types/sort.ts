import { TodoDTO } from './todo.dto';

export type SortBy = keyof Pick<TodoDTO, 'completed' | 'description' | 'title'>;
export type SortType = 'asc' | 'desc';
