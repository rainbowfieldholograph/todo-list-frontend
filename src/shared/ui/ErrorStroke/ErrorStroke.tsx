import { clsx } from 'clsx';
import { CSSProperties, FC, PropsWithChildren } from 'react';
import styles from './ErrorStroke.module.css';

type ErrorStrokeProps = PropsWithChildren<{
	style?: CSSProperties;
	className?: string;
	textCenter?: boolean;
}>;

export const ErrorStroke: FC<ErrorStrokeProps> = ({
	children,
	className,
	style,
	textCenter,
}) => {
	return (
		<p
			role="alert"
			style={style}
			className={clsx(styles.error, className, {
				[styles.textCenter]: textCenter,
			})}
		>
			{children}
		</p>
	);
};
