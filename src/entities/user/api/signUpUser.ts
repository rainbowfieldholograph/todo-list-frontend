import { UserDto } from '../types';
import { apiInstance } from 'shared/api';

export type SignUpBody = Pick<UserDto, 'email' | 'username'> & {
	password: string;
};

export const signUpUser = async (body: SignUpBody) => {
	const createdUser = apiInstance.post<UserDto>('/user', body);

	return createdUser;
};
