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
      <Modal
        isOpened={modalOpened}
        onClose={() => {
          console.log('onClose from Modal');
          onClose();
        }}
      >
        <TodoCreatorModal
          onClose={() => {
            console.log('onClose from Creator');
            onClose();
          }}
        />
      </Modal>
    </>
  );
};
