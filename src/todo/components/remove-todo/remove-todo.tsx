import { useAction, useAtom } from '@reatom/npm-react';
import { FC } from 'react';
import { Button } from 'shared/ui';
import { AsyncAction } from '@reatom/framework';

type RemoveTodoProps = {
	remove: AsyncAction;
};

export const RemoveTodo: FC<RemoveTodoProps> = ({ remove }) => {
	const handleRemoveTodo = useAction(remove);
	const [loading] = useAtom((ctx) => ctx.spy(remove.pendingAtom) > 0);

	return (
		<Button disabled={loading} onClick={handleRemoveTodo}>
			remove
		</Button>
	);
};
