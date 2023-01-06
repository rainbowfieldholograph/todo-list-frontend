import { reatomAsync } from '@reatom/framework';
import { todosAtom } from 'entities/todo';
import { userAtom } from 'entities/user';
import { getCurrentUser } from 'shared/api';

export const onSetupUser = reatomAsync(async (ctx) => {
	try {
		const { data: userResponseData } = await getCurrentUser();
		const { todo, username, _id, email } = userResponseData;

		ctx.get(() => {
			userAtom(ctx, { _id, username, email });
			todosAtom(ctx, todo);
		});
	} catch (error) {
		console.error(error);
	}
}, 'onSetupUser');
