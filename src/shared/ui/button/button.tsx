import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './button.module.css';

type ButtonProps = {
	children?: ReactNode;
	block?: boolean;
} & ComponentPropsWithoutRef<'button'>;

export const Button = ({
	children,
	className,
	block = false,
	...rest
}: ButtonProps) => {
	const buttonCn = clsx(className, styles.button, {
		[styles.block]: block,
	});

	return (
		<button className={buttonCn} {...rest}>
			{children}
		</button>
	);
};
