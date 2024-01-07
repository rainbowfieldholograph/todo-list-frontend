import type { PropsWithChildren } from 'react';
import styles from './auth-layout.module.css';

type AuthLayoutProps = PropsWithChildren<{ title: string }>;

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inner}>
				<h2 className={styles.title}>{title}</h2>
				{children}
			</div>
		</div>
	);
};
