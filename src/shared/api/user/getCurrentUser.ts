import { apiInstance } from '../base';
import { Todo, User } from 'shared/types';

interface Response extends User {
	todo: Todo[];
}

export const getCurrentUser = () => {
	return apiInstance.get<Response>('/user/me');
};
