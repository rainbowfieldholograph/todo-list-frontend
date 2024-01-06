import type { userResource } from './model';

export type UserDTO = {
	id: string;
	email: string;
	username: string;
};
export type User = NonNullable<Awaited<ReturnType<typeof userResource>>>;
