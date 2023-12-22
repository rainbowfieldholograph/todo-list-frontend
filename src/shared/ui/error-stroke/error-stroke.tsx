import type { CSSProperties, PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import styles from './error-stroke.module.css';

type ErrorStrokeProps = PropsWithChildren<{
	style?: CSSProperties;
	className?: string;
	textCenter?: boolean;
}>;

export const ErrorStroke = ({
	children,
	className,
	style,
	textCenter,
}: ErrorStrokeProps) => {
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
