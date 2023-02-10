import { apiInstance } from 'shared/api/base';
import { TodoDto } from '../types';

type PostTodoBody = Pick<TodoDto, 'description' | 'title'>;

export const postTodo = async (body: PostTodoBody) => {
	return apiInstance.post<TodoDto>('/todo', body);
};
