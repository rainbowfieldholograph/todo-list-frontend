import { reatomAsync } from '@reatom/framework';
import { userTodosAtom } from 'entities/todo';
import { userAtom } from 'entities/user';
import { getCurrentUser } from 'shared/api';

export const setupUserAction = reatomAsync(async (ctx) => {
	try {
		const { data: userResponseData } = await getCurrentUser();
		const { todo, username, _id, email } = userResponseData;

		ctx.get(() => {
			userAtom(ctx, { _id, username, email });
			userTodosAtom(ctx, todo);
		});
	} catch (error) {
		console.error(error);
	}
}, 'setupUserAction');
