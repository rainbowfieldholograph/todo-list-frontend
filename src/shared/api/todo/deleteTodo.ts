import { apiInstance } from '../base';
import { Todo } from '../../types';

export const deleteTodo = async (id: Todo['_id']) => {
	const url = '/todo/' + id;

	return await apiInstance.delete<Todo>(url);
};
