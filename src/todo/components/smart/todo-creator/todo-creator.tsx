import type { FC } from 'react';
import { useState } from 'react';
import { Button, Modal } from '~/shared/ui';
import { TodoCreatorModal } from './creator-modal';

export const TodoCreator: FC = () => {
	const [modalOpened, setModalOpened] = useState(false);

	const onClose = () => {
		setModalOpened(false);
	};

	const onClickButton = () => {
		setModalOpened(true);
	};

	return (
		<>
			<Button onClick={onClickButton}>Create new Todo</Button>
			<Modal isOpened={modalOpened} onClose={onClose}>
				<TodoCreatorModal onClose={onClose} />
			</Modal>
		</>
	);
};
