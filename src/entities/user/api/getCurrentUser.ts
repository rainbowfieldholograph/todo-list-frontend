import { apiInstance } from 'shared/api';
import { UserDto } from '../types';

export const getCurrentUser = () => {
	return apiInstance.get<UserDto>('/user/me');
};
