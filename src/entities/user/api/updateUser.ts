import { apiInstance } from 'shared/api';
import { UserDto } from '../types';

export const updateUser = async (updateData: Omit<UserDto, '_id'>) => {
	const updatedUser = await apiInstance.patch<UserDto>('/user/me', updateData);

	return updatedUser;
};
