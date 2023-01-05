import { FC, MouseEventHandler, ReactNode, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import { Portal } from '../Portal';
import styles from './Modal.module.css';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  isOpened: boolean;
};

export const Modal: FC<ModalProps> = ({ children, onClose, isOpened }) => {
  const handleEscapeClick = ({ key }: KeyboardEvent) => {
    if (key === 'Esc' || key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpened) return;

    window.addEventListener('keydown', handleEscapeClick);

    return () => {
      window.removeEventListener('keydown', handleEscapeClick);
    };
  }, [isOpened]);

  if (!isOpened) return null;

  const onClickModal: MouseEventHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <Portal>
      <FocusLock>
        <div onClick={onClose} className={styles.overlay}>
          <div onClick={onClickModal} className={styles.modal} role="dialog">
            {children}
          </div>
        </div>
      </FocusLock>
    </Portal>
  );
};
