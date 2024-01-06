import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';
import type { TodoDTO } from '../types';

export type UpdateTodoInput = Partial<
	Pick<TodoDTO, 'completed' | 'description' | 'title'>
>;

export const updateTodo = async (
	id: TodoDTO['id'],
	updateData: UpdateTodoInput,
	config?: AxiosRequestConfig,
) => {
	const url = '/todo/' + id;

	return apiInstance.patch<TodoDTO>(url, updateData, config);
};
