import { useAction, useAtom } from '@reatom/npm-react';
import { onToggleTodo } from 'entities/todo';
import { FC } from 'react';
import { Todo } from 'shared/types';

type ToggleTodoProps = {
	id: Todo['_id'];
	completion: boolean;
};

export const ToggleTodo: FC<ToggleTodoProps> = ({ id, completion }) => {
	const toggle = useAction(onToggleTodo);
	const [loading] = useAtom((ctx) => ctx.spy(onToggleTodo.pendingAtom) > 0);

	return (
		<label>
			<span>is completed: </span>
			<input
				disabled={loading}
				checked={completion}
				onChange={() => toggle(id)}
				type="checkbox"
			/>
		</label>
	);
};
