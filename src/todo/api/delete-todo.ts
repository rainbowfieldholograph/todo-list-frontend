import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';
import type { TodoDTO } from '../types';

export const deleteTodo = async (
	id: TodoDTO['id'],
	config?: AxiosRequestConfig,
) => {
	const url = '/todo/' + id;

	return await apiInstance.delete<TodoDTO>(url, config);
};
