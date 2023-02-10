import { TodoDto } from '../types';
import { apiInstance } from 'shared/api/base';

export const getTodos = async () => {
	return apiInstance.get<TodoDto[]>('/todo');
};
