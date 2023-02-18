import { apiInstance } from 'shared/api/base';
import { TodoDto } from '../types';

export const deleteTodo = async (id: TodoDto['_id']) => {
	const url = '/todo/' + id;

	return await apiInstance.delete<TodoDto>(url);
};
