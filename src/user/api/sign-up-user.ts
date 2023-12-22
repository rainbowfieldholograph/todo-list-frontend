import { apiInstance } from '~/shared/api';
import type { UserDTO } from '../types';

export type SignUpBody = Pick<UserDTO, 'email' | 'username'> & {
	password: string;
};

export const signUpUser = async (body: SignUpBody) => {
	const createdUser = await apiInstance.post<UserDTO>('/user', body);

	return createdUser;
};
