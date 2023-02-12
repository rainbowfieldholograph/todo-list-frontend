import { useState } from 'react';
import { Button, Modal } from 'shared/ui';
import { EditUserForm } from './EditUserForm';
import styles from './EditUser.module.css';

export const EditUser = () => {
	const [modalOpened, setModalOpened] = useState(false);

	return (
		<>
			<Button onClick={() => setModalOpened(true)}>Edit user</Button>
			<Modal
				className={styles.modal}
				isOpened={modalOpened}
				onClose={() => setModalOpened(false)}
			>
				<EditUserForm onSubmit={() => setModalOpened(false)} />
			</Modal>
		</>
	);
};
