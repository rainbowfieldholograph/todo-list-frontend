import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './container.module.css';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

export const Container = ({ className, children, ...rest }: ContainerProps) => {
	return (
		<div className={clsx(className, styles.container)} {...rest}>
			{children}
		</div>
	);
};
