import type { CSSProperties, PropsWithChildren } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import styles from './dialog.module.css';

type ContentProps = PropsWithChildren<{
	className?: string;
	style?: CSSProperties;
}>;
const Content = ({ children, className, style }: ContentProps) => {
	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className={styles.overlay}>
				<DialogPrimitive.Content
					style={style}
					className={clsx(styles.modal, className)}
				>
					{children}
				</DialogPrimitive.Content>
			</DialogPrimitive.Overlay>
		</DialogPrimitive.Portal>
	);
};

export const Dialog = {
	Root: DialogPrimitive.Root,
	Content: Content,
	Trigger: DialogPrimitive.Trigger,
};
