import { apiInstance } from 'shared/api';
import { UserDTO } from '../types';

export const getCurrentUser = async () => {
	const currentUser = await apiInstance.get<UserDTO>('/user/me');

	return currentUser;
};
