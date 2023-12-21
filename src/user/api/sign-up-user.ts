import { UserDTO } from '../types';
import { apiInstance } from 'shared/api';

export type SignUpBody = Pick<UserDTO, 'email' | 'username'> & {
	password: string;
};

export const signUpUser = async (body: SignUpBody) => {
	const createdUser = await apiInstance.post<UserDTO>('/user', body);

	return createdUser;
};
