import { atom, reatomAsync, withReset } from '@reatom/framework';
import { createTodo } from '../../model';
import { FormEvent } from 'react';
import { AnyFunction } from 'shared/types';

export const titleAtom = atom('', 'titleAtom').pipe(withReset());
export const descriptionAtom = atom('', 'descriptionAtom').pipe(withReset());

export const onSubmit = reatomAsync(
	async (ctx, event: FormEvent<HTMLFormElement>, onSuccess: AnyFunction) => {
		event.preventDefault();

		const title = ctx.get(titleAtom);
		const description = ctx.get(descriptionAtom);

		try {
			await createTodo(ctx, { description, title });

			onSuccess();

			titleAtom.reset(ctx);
			descriptionAtom.reset(ctx);
		} catch (error) {
			console.error(error);
		}
	},
	'onSubmit',
);
