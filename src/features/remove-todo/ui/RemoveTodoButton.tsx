import { useAction, useAtom } from '@reatom/npm-react';
import { TodoDto } from 'entities/todo';
import { FC } from 'react';
import { Button } from 'shared/ui';
import { AsyncAction } from '@reatom/framework';

type RemoveTodoButtonProps = {
	id: TodoDto['_id'];
	remove: AsyncAction;
};

export const RemoveTodoButton: FC<RemoveTodoButtonProps> = ({ id, remove }) => {
	const handleRemoveTodo = useAction(remove);
	const [loading] = useAtom((ctx) => ctx.spy(remove.pendingAtom) > 0);

	return (
		<Button disabled={loading} onClick={() => handleRemoveTodo(id)}>
			remove
		</Button>
	);
};
