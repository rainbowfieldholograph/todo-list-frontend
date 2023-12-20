import { clsx } from 'clsx';
import { FC, HTMLInputTypeAttribute } from 'react';
import { TextFieldProps } from './text-field.props';
import styles from './text-field.module.css';

type InputProps = TextFieldProps<HTMLInputElement> & {
	type?: HTMLInputTypeAttribute;
};

export const Input: FC<InputProps> = ({
	className,
	style,
	label,
	value,
	onChange,
	...rest
}) => {
	return (
		<label style={style} className={clsx(className, styles.wrapper)}>
			<input
				value={value}
				onChange={onChange}
				className={styles.input}
				{...rest}
			/>
			<span className={styles.label}>{label}</span>
		</label>
	);
};
