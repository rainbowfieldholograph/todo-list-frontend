import { FC, PropsWithChildren } from 'react';
import styles from './AuthLayout.module.css';

type AuthLayoutProps = PropsWithChildren<{ title: string }>;

export const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};
