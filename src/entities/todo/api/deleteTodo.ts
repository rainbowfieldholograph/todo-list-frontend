import { apiInstance } from 'shared/api/base';
import { TodoDto } from '../types';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const deleteTodo = async (id: TodoDto['_id']) => {
	const url = '/todo/' + id;

	await sleep();

	return await apiInstance.delete<TodoDto>(url);
};
