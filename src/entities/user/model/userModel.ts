import {
	atom,
	reatomAsync,
	withReset,
	onConnect,
	action,
} from '@reatom/framework';
import { User } from 'shared/types';
import { onSetupUser } from 'shared/model';
import {
	AuthenticateBody,
	authenticateUser,
	getCurrentUser,
	setAuthHeader,
} from 'shared/api';
import { onResetTodos, todosAtom } from 'entities/todo';
import { clearToken, saveToken, getToken } from '../lib';
import { SignUpBody, signUpUser } from 'shared/api/user/signUpUser';

export const userAtom = atom<User | null>(null, 'currentUserAtom').pipe(
	withReset(),
);

onConnect(userAtom, (ctx) => {
	const token = getToken();

	if (!token) return;

	setAuthHeader(token);

	ctx.schedule(async () => {
		await onSetupUser(ctx);
	});
});

export const onLogin = reatomAsync(async (ctx, body: AuthenticateBody) => {
	const authenticateResponse = await authenticateUser(body);

	const { accessToken } = authenticateResponse.data;

	setAuthHeader(accessToken);
	saveToken(accessToken);

	const { data: currentUser } = await getCurrentUser();

	const { _id, email, username, todo } = currentUser;

	ctx.get(() => {
		todosAtom(ctx, todo);
		userAtom(ctx, { _id, email, username });
	});
}, 'onLogin');

export const onSignUp = reatomAsync(async (ctx, body: SignUpBody) => {
	try {
		await signUpUser(body);

		await onLogin(ctx, { email: body.email, password: body.password });
	} catch (error) {
		console.error(error);
	}
}, 'onSignUp');

export const onLogout = action((ctx) => {
	userAtom.reset(ctx);
	onResetTodos(ctx);
	clearToken();
}, 'onLogout');
