export interface UserDto {
	_id: string;
	email: string;
	username: string;
}

export type UserWithoutIdDto = Omit<UserDto, '_id'>;
