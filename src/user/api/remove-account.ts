import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';

export const removeAccount = async (config?: AxiosRequestConfig) => {
	await apiInstance.delete('/user/me', config);
};
