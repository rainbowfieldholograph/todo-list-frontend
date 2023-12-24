import { Button } from '~/shared/ui';

type RemoveTodoProps = { onRemove: VoidFunction; loading: boolean };

export const RemoveTodo = ({ onRemove, loading }: RemoveTodoProps) => {
	return (
		<Button disabled={loading} onClick={onRemove}>
			remove
		</Button>
	);
};
