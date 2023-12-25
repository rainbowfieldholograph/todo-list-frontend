import { useCallback, useMemo, useState } from 'react';
import { Button, Modal } from '~/shared/ui';
import { TodoCreatorModal } from './creator-modal';
import { reatomTodoCreator } from './model';

export const TodoCreator = () => {
	const [modalOpened, setModalOpened] = useState(false);
	const formModel = useMemo(() => reatomTodoCreator(), []);
	const handleClose = useCallback(
		() => setModalOpened(false),
		[setModalOpened],
	);
	const handleOpen = useCallback(() => setModalOpened(true), [setModalOpened]);

	return (
		<>
			<Button onClick={handleOpen}>Create new Todo</Button>
			<Modal isOpened={modalOpened} onClose={handleClose}>
				<TodoCreatorModal model={formModel} onClose={handleClose} />
			</Modal>
		</>
	);
};
