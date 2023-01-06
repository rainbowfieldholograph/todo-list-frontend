import { atom, reatomAsync, withReset } from '@reatom/framework';
import { onCreateTodo } from 'entities/todo';
import { FormEvent } from 'react';

export const titleAtom = atom('').pipe(withReset());
export const descriptionAtom = atom('').pipe(withReset());

export const onSubmit = reatomAsync(
	async (
		ctx,
		event: FormEvent<HTMLFormElement>,
		onSuccess: (...args: any[]) => any,
	) => {
		event.preventDefault();

		const title = ctx.get(titleAtom);
		const description = ctx.get(descriptionAtom);

		try {
			await onCreateTodo(ctx, { description, title });

			onSuccess();

			titleAtom.reset(ctx);
			descriptionAtom.reset(ctx);
		} catch (error) {
			console.error(error);
		}
	},
);
