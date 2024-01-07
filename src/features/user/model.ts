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
import { navigate } from 'wouter/use-location';
import { todoSortAtom } from '~/features/todo/model';
import { errorMapper } from '~/shared/lib/utils';
import type { User } from './types';
import * as api from './api';
import { LS_TOKEN_KEY } from './config';

export const tokenAtom = atom('', 'tokenAtom').pipe(
	withLocalStorage(LS_TOKEN_KEY),
	withReset(),
);

tokenAtom.onChange((ctx, token) => {
	if (token) return;
});

export const userResource = reatomResource(async (ctx) => {
	const token = ctx.spy(tokenAtom);
	if (!token) return;

	const { data: currentUser } = await api.getCurrentUser({
		signal: ctx.controller.signal,
	});
	return currentUser;
}, 'userResource').pipe(withDataAtom(), withAbort());

export const isLoggedAtom = atom(
	(ctx) => Boolean(ctx.spy(userResource.dataAtom)),
	'isLoggedAtom',
);

export const changeCredentials = reatomAsync(
	async (ctx, updateData: Partial<Pick<User, 'email' | 'username'>>) => {
		const { data } = await api.updateUser(updateData, {
			signal: ctx.controller.signal,
		});
		userResource.dataAtom(ctx, data);
	},
	'changeCredentials',
).pipe(withAbort());

export const login = reatomAsync(async (ctx, body: api.AuthenticateBody) => {
	const { data } = await api.authenticateUser(body, {
		signal: ctx.controller.signal,
	});
	return data;
}, 'login').pipe(
	withAbort(),
	withErrorAtom((_ctx, err) => errorMapper(err)),
);
login.onFulfill.onCall((ctx, { accessToken }) => tokenAtom(ctx, accessToken));
login.onFulfill.onCall(() => navigate('/todo'));

export const signUp = reatomAsync(async (ctx, body: api.SignUpBody) => {
	const response = await api.signUpUser(body, {
		signal: ctx.controller.signal,
	});
	const { accessToken } = await login(ctx, {
		email: body.email,
		password: body.password,
	});

	return { ...response.data, accessToken };
}, 'signUp').pipe(
	withAbort(),
	withErrorAtom((_ctx, err) => errorMapper(err)),
);
signUp.onFulfill.onCall((ctx, { accessToken }) => tokenAtom(ctx, accessToken));

export const logout = action((ctx) => {
	tokenAtom.reset(ctx);
}, 'logout');
logout.onCall(todoSortAtom.reset);
logout.onCall(() => navigate('/login'));

export const removeAccount = reatomAsync(async (ctx) => {
	await api.removeAccount({ signal: ctx.controller.signal });
}, 'removeAccount').pipe(withAbort());

removeAccount.onFulfill.onCall(logout);
