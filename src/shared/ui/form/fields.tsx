import { FC, PropsWithChildren } from 'react';
import styles from './fields.module.css';

export const Fields: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.fields}>{children}</div>;
};
