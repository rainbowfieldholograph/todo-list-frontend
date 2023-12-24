import {
	atom,
	reatomAsync,
	withReset,
	action,
	reatomResource,
	withDataAtom,
	withAbort,
	withErrorAtom,
} from '@reatom/framework';
import { withLocalStorage } from '@reatom/persist-web-storage';
import { errorMapper } from '~/shared/lib/utils';
import type { AuthenticateBody, SignUpBody } from './api';
import type { User } from './types';
import {
	authenticateUser,
	getCurrentUser,
	signUpUser,
	updateUser,
	removeAccount,
} from './api';
import { LS_TOKEN_KEY } from './config';

export const tokenAtom = atom('', 'tokenAtom').pipe(
	withLocalStorage(LS_TOKEN_KEY),
	withReset(),
);

export const userResource = reatomResource(async (ctx) => {
	const token = ctx.spy(tokenAtom);
	if (!token) return;

	const { data: currentUser } = await getCurrentUser({
		signal: ctx.controller.signal,
	});
	return currentUser;
}, 'userResource').pipe(withDataAtom(), withAbort());

export const isAuthAtom = atom(
	(ctx) => Boolean(ctx.spy(userResource.dataAtom)),
	'isAuthAtom',
);

export const changeCredentials = reatomAsync(
	async (ctx, updateData: Partial<Pick<User, 'email' | 'username'>>) => {
		const { data } = await updateUser(updateData, {
			signal: ctx.controller.signal,
		});
		userResource.dataAtom(ctx, data);
	},
	'changeCredentials',
).pipe(withAbort());

export const login = reatomAsync(async (ctx, body: AuthenticateBody) => {
	const { data } = await authenticateUser(body, {
		signal: ctx.controller.signal,
	});
	return data;
}, 'login').pipe(
	withAbort(),
	withErrorAtom((_ctx, err) => errorMapper(err)),
);

login.onFulfill.onCall((ctx, { accessToken }) => tokenAtom(ctx, accessToken));

export const signUp = reatomAsync(async (ctx, body: SignUpBody) => {
	return (await signUpUser(body, { signal: ctx.controller.signal })).data;
}, 'signUp').pipe(
	withAbort(),
	withErrorAtom((_ctx, err) => errorMapper(err)),
);

signUp.onFulfill.onCall((ctx, payload) => {
	tokenAtom(ctx, payload.accessToken);
});

export const logout = action((ctx) => {
	tokenAtom.reset(ctx);
}, 'logout');

export const onRemoveAccount = reatomAsync(async (ctx) => {
	await removeAccount({ signal: ctx.controller.signal });
}, 'onRemoveAccount').pipe(withAbort());

onRemoveAccount.onFulfill.onCall(logout);
