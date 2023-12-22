import type { FC } from 'react';
import { clsx } from 'clsx';
import type { TextFieldProps } from './text-field.props';
import styles from './text-field.module.css';

type TextAreaProps = TextFieldProps<HTMLTextAreaElement> & {
	rows?: number;
};

export const TextArea: FC<TextAreaProps> = ({
	className,
	style,
	label,
	onChange,
	value,
	rows = 6,
	...rest
}) => {
	return (
		<label style={style} className={clsx(className, styles.wrapper)}>
			<textarea
				value={value}
				onChange={onChange}
				className={styles.input}
				rows={rows}
				{...rest}
			/>
			<span className={styles.label}>{label}</span>
		</label>
	);
};
