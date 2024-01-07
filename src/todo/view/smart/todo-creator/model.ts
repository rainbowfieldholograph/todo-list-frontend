import { action, atom, withReset } from '@reatom/framework';

export const reatomTodoCreator = () => {
	const titleAtom = atom('', 'titleAtom').pipe(withReset());
	const descriptionAtom = atom('', 'descriptionAtom').pipe(withReset());
	const reset = action((ctx) => {
		titleAtom.reset(ctx);
		descriptionAtom.reset(ctx);
	}, 'reset');

	return { titleAtom, descriptionAtom, reset };
};

export type TodoCreatorFormModel = ReturnType<typeof reatomTodoCreator>;
