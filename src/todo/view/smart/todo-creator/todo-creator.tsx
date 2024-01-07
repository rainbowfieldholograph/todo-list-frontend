import { useMemo, useState } from 'react';
import { useEvent } from '~/shared/lib/hooks';
import { Button, Dialog } from '~/shared/view';
import { TodoCreatorForm } from './creator-form';
import { reatomTodoCreator } from './model';

export const TodoCreator = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const handleClose = useEvent(() => setDialogOpen(false));
	const formModel = useMemo(() => reatomTodoCreator(), []);

	return (
		<>
			<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
				<Dialog.Trigger asChild>
					<Button>Create new Todo</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<TodoCreatorForm model={formModel} onClose={handleClose} />
				</Dialog.Content>
			</Dialog.Root>
		</>
	);
};
