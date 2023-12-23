import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';
import type { UserDTO } from '../types';

export type SignUpBody = Pick<UserDTO, 'email' | 'username'> & {
	password: string;
};

type SignUpResponse = UserDTO & { accessToken: string };

export const signUpUser = async (
	body: SignUpBody,
	config?: AxiosRequestConfig,
) => {
	const createdUser = await apiInstance.post<SignUpResponse>(
		'/user/sign-up',
		body,
		config,
	);

	return createdUser;
};
