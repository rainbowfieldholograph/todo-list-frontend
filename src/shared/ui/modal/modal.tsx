import {
	CSSProperties,
	FC,
	MouseEventHandler,
	PropsWithChildren,
	useEffect,
} from 'react';
import { clsx } from 'clsx';
import FocusLock from 'react-focus-lock';
import { Portal } from '../portal';
import styles from './modal.module.css';

type ModalProps = PropsWithChildren<{
	onClose: () => void;
	isOpened: boolean;
	className?: string;
	style?: CSSProperties;
}>;

export const Modal: FC<ModalProps> = ({
	children,
	className,
	style,
	onClose,
	isOpened,
}) => {
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
					<div
						onClick={onClickModal}
						className={clsx(styles.modal, className)}
						role="dialog"
						style={style}
					>
						{children}
					</div>
				</div>
			</FocusLock>
		</Portal>
	);
};
