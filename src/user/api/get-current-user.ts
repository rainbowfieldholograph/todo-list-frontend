import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';
import type { UserDTO } from '../types';

export const getCurrentUser = async (config?: AxiosRequestConfig) => {
	const currentUser = await apiInstance.get<UserDTO>('/user/me', config);

	return currentUser;
};
