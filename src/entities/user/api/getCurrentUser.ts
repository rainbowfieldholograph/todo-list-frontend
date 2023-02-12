import { apiInstance } from 'shared/api';
import { UserDto } from '../types';

export const getCurrentUser = async () => {
	const currentUser = await apiInstance.get<UserDto>('/user/me');

	return currentUser;
};
