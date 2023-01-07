import { User } from 'shared/types';
import { apiInstance } from '../base';

export type SignUpBody = Pick<User, 'email' | 'username'> & {
	password: string;
};

export const signUpUser = async (body: SignUpBody) => {
	return apiInstance.post<User>('/user', body);
};
