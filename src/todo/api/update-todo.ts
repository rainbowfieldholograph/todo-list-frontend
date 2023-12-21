import { apiInstance } from 'shared/api';
import { TodoDTO } from '../types';
import { AxiosRequestConfig } from 'axios';

export const updateTodo = async (
	id: TodoDTO['_id'],
	updateData: Partial<Pick<TodoDTO, 'completed' | 'description' | 'title'>>,
	config?: AxiosRequestConfig,
) => {
	const url = '/todo/' + id;

	return apiInstance.patch<TodoDTO>(url, updateData, config);
};
