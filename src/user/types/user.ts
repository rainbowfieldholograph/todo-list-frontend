import type { ParseAtoms } from '@reatom/framework';
import type { userAtom } from '~/user/model';

export type UserDTO = {
	_id: string;
	email: string;
	username: string;
};
export type UserWithoutIdDto = Omit<UserDTO, '_id'>;
export type User = ParseAtoms<typeof userAtom>;
