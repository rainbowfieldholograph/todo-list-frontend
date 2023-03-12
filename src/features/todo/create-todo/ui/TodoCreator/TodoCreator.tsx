import { FC, useState } from 'react';
import { Button, Modal } from 'shared/ui';
import { TodoCreatorModal } from './TodoCreatorModal';

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
