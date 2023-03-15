import { TodoDto, SortFields, SortTypes } from '../types';
import { apiInstance } from 'shared/api/base';

type GetTodosArgs =
	| { sortField: SortFields; sortType?: SortTypes | null }
	| { sortField: never; sortType?: never }
	| void
	| null;

export const getTodos = async (args: GetTodosArgs) => {
	return apiInstance.get<TodoDto[]>('/todo', {
		params: {
			sort: args && `${args?.sortField}|${args?.sortType ?? 'asc'}`,
		},
	});
};
