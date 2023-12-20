import { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';
import styles from './container.module.css';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

export const Container: FC<ContainerProps> = ({
	className,
	children,
	...rest
}) => {
	return (
		<div className={clsx(className, styles.container)} {...rest}>
			{children}
		</div>
	);
};
