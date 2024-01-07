import { useState } from 'react';
import { Button, Dialog } from '~/shared/view';
import { EditUserForm } from './edit-user-form';

export const EditUser = () => {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
			<Dialog.Trigger asChild>
				<Button>Edit user</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<EditUserForm onSubmit={() => setDialogOpen(false)} />
			</Dialog.Content>
		</Dialog.Root>
	);
};
