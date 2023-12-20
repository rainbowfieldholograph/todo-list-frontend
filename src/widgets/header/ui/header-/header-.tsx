import { FC } from 'react';
import { AuthSection } from './auth-section';
import { LinksList } from './links-list';
import styles from './Header.module.css';

export const Header: FC = () => {
	return (
		<header className={styles.header}>
			<LinksList />
			<AuthSection />
		</header>
	);
};
