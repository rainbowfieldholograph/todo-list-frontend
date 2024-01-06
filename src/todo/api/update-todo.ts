import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';
import type { TodoDTO } from '../types';

export const updateTodo = async (
	id: TodoDTO['id'],
	updateData: Partial<Pick<TodoDTO, 'completed' | 'description' | 'title'>>,
	config?: AxiosRequestConfig,
) => {
	const url = '/todo/' + id;

	return apiInstance.patch<TodoDTO>(url, updateData, config);
};
