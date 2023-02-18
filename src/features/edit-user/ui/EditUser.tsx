import { useState } from 'react';
import { Button, Modal } from 'shared/ui';
import { EditUserForm } from './EditUserForm';

export const EditUser = () => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<>
			<Button onClick={() => setModalOpened(true)}>Edit user</Button>
			<Modal isOpened={modalOpened} onClose={() => setModalOpened(false)}>
				<EditUserForm onSubmit={() => setModalOpened(false)} />
			</Modal>
		</>
	);
};
