import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';
import type { TodoDTO } from '../types';

type PostTodoBody = Pick<TodoDTO, 'description' | 'title'>;

export const postTodo = async (
	body: PostTodoBody,
	config?: AxiosRequestConfig,
) => {
	return apiInstance.post<TodoDTO>('/todo', body, config);
};
