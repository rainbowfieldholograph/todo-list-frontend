import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';
import type { SortBy, SortType, TodoDTO } from '../types';

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
