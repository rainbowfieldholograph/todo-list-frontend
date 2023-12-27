import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';
import type { TodoDTO } from '../types';

export const getTodoById = async (
	id: TodoDTO['_id'],
	config?: AxiosRequestConfig,
) => {
	return await apiInstance.get<TodoDTO>(`todo/${id}`, config);
};
