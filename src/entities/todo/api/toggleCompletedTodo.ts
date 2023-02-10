import { TodoDto } from '../types';
import { apiInstance } from 'shared/api/base';

export const toggleCompletedTodo = async (
	id: TodoDto['_id'],
	completion: boolean,
) => {
	const url = '/todo/' + id;

	return apiInstance.patch<TodoDto>(url, { completed: Boolean(completion) });
};
