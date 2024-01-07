import { Button } from '~/shared/view';

type RemoveTodoProps = { onRemove: VoidFunction; loading: boolean };

export const RemoveTodo = ({ onRemove, loading }: RemoveTodoProps) => {
	return (
		<Button disabled={loading} onClick={onRemove}>
			remove
		</Button>
	);
};
