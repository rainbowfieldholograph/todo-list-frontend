import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';
import type { UserDTO } from '../types';

export const updateUser = async (
	updateData: Partial<Pick<UserDTO, 'email' | 'username'>>,
	config?: AxiosRequestConfig,
) => {
	const updatedUser = await apiInstance.patch<UserDTO>(
		'/user/me',
		updateData,
		config,
	);

	return updatedUser;
};
