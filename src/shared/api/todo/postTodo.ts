import { apiInstance } from '../base';
import { Todo } from '../../types';

type PostTodoBody = Pick<Todo, 'description' | 'title'>;

export const postTodo = async (body: PostTodoBody) => {
	return apiInstance.post<Todo>('/todo', body);
};
