import { apiInstance } from 'shared/api';

export type AuthenticateBody = {
	email: string;
	password: string;
};

type Response = {
	accessToken: string;
};

export const authenticateUser = async (body: AuthenticateBody) => {
	const authenticatedUser = await apiInstance.post<Response>(
		'/user/login',
		body,
	);

	return authenticatedUser;
};
