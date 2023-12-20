import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import styles from './form.module.css';

export const Fields = ({ children }: PropsWithChildren) => {
	return <div className={styles.fields}>{children}</div>;
};

type FormProps = ComponentPropsWithoutRef<'form'> & {
	border?: boolean;
};

export const Form = ({
	className,
	border = true,
	children,
	...rest
}: FormProps) => {
	return (
		<form
			className={clsx(className, styles.form, {
				[styles.border]: border,
			})}
			action=""
			{...rest}
		>
			{children}
		</form>
	);
};
