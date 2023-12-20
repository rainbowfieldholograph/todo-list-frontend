import { apiInstance } from 'shared/api';
import { UserDto, UserWithoutIdDto } from '../types';

export const updateUser = async (updateData: Partial<UserWithoutIdDto>) => {
	const updatedUser = await apiInstance.patch<UserDto>('/user/me', updateData);

	return updatedUser;
};
