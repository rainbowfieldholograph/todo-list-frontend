import type { AxiosRequestConfig } from 'axios';
import { apiInstance } from '~/shared/api';

export type AuthenticateBody = {
	email: string;
	password: string;
};

type AuthenticateResponse = { accessToken: string };

export const authenticateUser = async (
	body: AuthenticateBody,
	config: AxiosRequestConfig,
) => {
	const authenticatedUser = await apiInstance.post<AuthenticateResponse>(
		'/user/login',
		body,
		config,
	);

	return authenticatedUser;
};
