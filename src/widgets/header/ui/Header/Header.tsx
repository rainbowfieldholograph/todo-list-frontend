import { FC } from 'react';
import { AuthSection } from './AuthSection';
import { LinksList } from './LinksList';
import styles from './Header.module.css';

export const Header: FC = () => {
	return (
		<header className={styles.header}>
			<LinksList />
			<AuthSection />
		</header>
	);
};
