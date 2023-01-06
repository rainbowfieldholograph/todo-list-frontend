import {
	atom,
	reatomAsync,
	withReset,
	onConnect,
	action,
} from '@reatom/framework';
import { User } from 'shared/types';
import { onSetupUser } from 'shared/model';
import { authenticateUser, getCurrentUser, setAuthHeader } from 'shared/api';
import { onResetTodos, todosAtom } from 'entities/todo';
import { clearToken, saveToken, getToken } from '../lib';

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

export const onLogin = reatomAsync(async (ctx, body) => {
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
}, 'loginAction');

export const onLogout = action((ctx) => {
	userAtom.reset(ctx);
	onResetTodos(ctx);
	clearToken();
}, 'logoutAction');
