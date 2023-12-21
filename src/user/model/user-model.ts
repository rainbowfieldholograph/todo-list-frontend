import {
	atom,
	reatomAsync,
	withReset,
	onConnect,
	action,
} from '@reatom/framework';
import { removeSameFieldValues } from 'shared/lib/utils';
import { UserDTO, UserWithoutIdDto } from '../types';
import {
	AuthenticateBody,
	authenticateUser,
	getCurrentUser,
	SignUpBody,
	signUpUser,
	updateUser,
	removeAccount,
} from '../api';
import { LS_TOKEN_KEY } from '../config';
import { withLocalStorage } from '@reatom/persist-web-storage';

export const tokenAtom = atom('', 'tokenAtom').pipe(
	withLocalStorage(LS_TOKEN_KEY),
	withReset(),
);

export const userAtom = atom<UserDTO | null>(null, 'userAtom').pipe(
	withReset(),
);

export const isAuthAtom = atom(
	(ctx) => Boolean(ctx.spy(userAtom)),
	'isAuthAtom',
);

onConnect(userAtom, (ctx) => {
	const token = ctx.get(tokenAtom);

	if (!token) return;

	ctx.schedule(async () => {
		try {
			const { data: currentUser } = await getCurrentUser();

			const { _id, email, username } = currentUser;
			userAtom(ctx, { _id, email, username });
		} catch (error) {
			console.error(error);
		}
	});
});

export const onChangeCredentials = reatomAsync(
	async (ctx, updateData: UserWithoutIdDto) => {
		const dataToUpdate = removeSameFieldValues(ctx.get(userAtom)!, updateData);

		if (!dataToUpdate) return;

		try {
			const response = await updateUser(dataToUpdate);

			userAtom(ctx, response.data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	'onChangeCredentials',
);

export const login = reatomAsync(async (ctx, body: AuthenticateBody) => {
	try {
		const response = await authenticateUser(body);
		const { accessToken } = response.data;

		tokenAtom(ctx, accessToken);

		const { data: currentUser } = await getCurrentUser();
		const { _id, email, username } = currentUser;

		userAtom(ctx, { _id, email, username });
	} catch (error) {
		console.error(error);
		throw error;
	}
}, 'login');

export const onSignUp = reatomAsync(async (ctx, body: SignUpBody) => {
	try {
		await signUpUser(body);
		await login(ctx, { email: body.email, password: body.password });
	} catch (error) {
		console.error(error);
		throw error;
	}
}, 'onSignUp');

export const logout = action((ctx) => {
	userAtom.reset(ctx);
	tokenAtom.reset(ctx);
}, 'logout');

export const onRemoveAccount = reatomAsync(async (ctx) => {
	await removeAccount();
	logout(ctx);
}, 'onRemoveAccount');
