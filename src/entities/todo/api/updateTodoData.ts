import { apiInstance } from 'shared/api';
import { TodoDto } from '../types';

export const updateTodoData = async (
	id: TodoDto['_id'],
	updateData: Omit<Partial<TodoDto>, '_id'>,
) => {
	const url = '/todo/' + id;

	const updatedTodo = await apiInstance.patch<TodoDto>(url, updateData);
	return updatedTodo;
};
