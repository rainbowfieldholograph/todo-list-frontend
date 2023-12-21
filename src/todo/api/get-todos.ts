import { SortBy, SortType, TodoDTO } from '../types';
import { apiInstance } from 'shared/api/base';
import { AxiosRequestConfig } from 'axios';

type GetTodosArgs = { sortBy: SortBy; sortType: SortType } | null;

export const getTodos = async (
	sort: GetTodosArgs,
	config?: AxiosRequestConfig,
) => {
	return apiInstance.get<TodoDTO[]>('/todo', {
		params: { sortBy: sort?.sortBy, sortType: sort?.sortType },
		...config,
	});
};
