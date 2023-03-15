import { TodoDto } from '../types';
import { apiInstance } from 'shared/api/base';
import { TodoSortVariant } from '../model';

type GetTodosArgs = {
	sort: NonNullable<TodoSortVariant>;
} | null | void;

export const getTodos = async (args: GetTodosArgs) => {
	return apiInstance.get<TodoDto[]>('/todo', {
		params: {
			sort: args && `${args?.sort.field}|${args?.sort.type ?? 'asc'}`,
		},
	});
};
