import { atom, reatomAsync, withReset, onConnect, action } from '@reatom/framework';
import { User } from 'shared/types';
import { setupUserAction } from 'shared/model';
import { clearToken, saveToken, getToken } from './lib';
import { resetTodosAction, userTodosAtom } from 'entities/todo';
import { authenticateUser, getCurrentUser, setAuthHeader } from 'shared/api';

export const userAtom = atom<User | null>(null, 'currentUserAtom').pipe(withReset());

onConnect(userAtom, (ctx) => {
  const token = getToken();

  if (!token) return;

  setAuthHeader(token);

  ctx.schedule(async () => {
    await setupUserAction(ctx);
  });
});

export const loginAction = reatomAsync(async (ctx, body) => {
  const authenticateResponse = await authenticateUser(body);

  const { accessToken } = authenticateResponse.data;

  setAuthHeader(accessToken);
  saveToken(accessToken);

  const { data: currentUser } = await getCurrentUser();

  const { _id, email, username, todo } = currentUser;

  ctx.get(() => {
    userTodosAtom(ctx, todo);
    userAtom(ctx, { _id, email, username });
  });
}, 'loginAction');

export const logoutAction = action((ctx) => {
  userAtom.reset(ctx);
  resetTodosAction(ctx);
  clearToken();
}, 'logoutAction');
