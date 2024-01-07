import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ReactNode,
} from 'react';
import { clsx } from 'clsx';
import styles from './button.module.css';

type ButtonProps = {
	children?: ReactNode;
	block?: boolean;
} & ComponentPropsWithoutRef<'button'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const { children, className, block = false, ...rest } = props;
		const buttonCn = clsx(className, styles.button, { [styles.block]: block });

		return (
			<button ref={ref} className={buttonCn} {...rest}>
				{children}
			</button>
		);
	},
);

Button.displayName = 'Button';
