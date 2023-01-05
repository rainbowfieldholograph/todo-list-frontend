import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariants = 'primary' | 'secondary';

type ButtonProps = {
	children?: ReactNode;
	block?: boolean;
	variant?: ButtonVariants;
} & ComponentPropsWithoutRef<'button'>;

export const Button = ({
	children,
	className,
	block = false,
	variant = 'primary',
	...rest
}: ButtonProps) => {
	const buttonCn = clsx(className, styles.button, styles[variant], {
		[styles.block]: block,
	});

	return (
		<button className={buttonCn} {...rest}>
			{children}
		</button>
	);
};
