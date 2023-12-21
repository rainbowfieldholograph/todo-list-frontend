import { apiInstance } from 'shared/api/base';
import { TodoDTO } from '../types';
import { AxiosRequestConfig } from 'axios';

export const deleteTodo = async (
	id: TodoDTO['_id'],
	config?: AxiosRequestConfig,
) => {
	const url = '/todo/' + id;

	return await apiInstance.delete<TodoDTO>(url, config);
};
