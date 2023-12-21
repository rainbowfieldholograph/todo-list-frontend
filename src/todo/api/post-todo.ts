import { apiInstance } from 'shared/api/base';
import { TodoDTO } from '../types';
import { AxiosRequestConfig } from 'axios';

type PostTodoBody = Pick<TodoDTO, 'description' | 'title'>;

export const postTodo = async (
	body: PostTodoBody,
	config?: AxiosRequestConfig,
) => {
	return apiInstance.post<TodoDTO>('/todo', body, config);
};
