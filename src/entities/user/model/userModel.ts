import {
	atom,
	reatomAsync,
	withReset,
	onConnect,
	action,
} from '@reatom/framework';
import { UserDto } from '../types';
import { setAuthHeader } from 'shared/api';
import {
	AuthenticateBody,
	authenticateUser,
	getCurrentUser,
	SignUpBody,
	signUpUser,
	updateUser,
} from '../api';
// import { onResetTodos } from 'entities/todo';
import { clearToken, saveToken, getToken } from '../lib';

export const userAtom = atom<UserDto | null>(null, 'currentUserAtom').pipe(
	withReset(),
);

onConnect(userAtom, (ctx) => {
	const token = getToken();

	if (!token) return;

	setAuthHeader(token);

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
	async (ctx, updateData: Omit<UserDto, '_id'>) => {
		try {
			const response = await updateUser(updateData);

			userAtom(ctx, response.data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const onLogin = reatomAsync(async (ctx, body: AuthenticateBody) => {
	try {
		const authenticateResponse = await authenticateUser(body);

		const { accessToken } = authenticateResponse.data;

		setAuthHeader(accessToken);
		saveToken(accessToken);

		const { data: currentUser } = await getCurrentUser();
		const { _id, email, username } = currentUser;

		userAtom(ctx, { _id, email, username });
	} catch (error) {
		console.error(error);
		throw error;
	}
}, 'onLogin');

export const onSignUp = reatomAsync(async (ctx, body: SignUpBody) => {
	try {
		await signUpUser(body);

		await onLogin(ctx, { email: body.email, password: body.password });
	} catch (error) {
		console.error(error);
		throw error;
	}
}, 'onSignUp');

export const onLogout = action((ctx) => {
	userAtom.reset(ctx);
	clearToken();
}, 'onLogout');
