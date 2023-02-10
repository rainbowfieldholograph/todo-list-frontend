import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAction, useAtom } from '@reatom/npm-react';
import { userAtom, onLogout } from 'entities/user';
import { Button } from 'shared/ui';
import { routeMap } from 'shared/config';
import styles from './AuthSection.module.css';

export const AuthSection: FC = () => {
	const [user] = useAtom(userAtom);
	const logout = useAction(onLogout);

	if (!user) return null;

	// Todo: make a ButtonLink component

	return (
		<div className={styles.wrapper}>
			<Link to={routeMap.userPage} className={styles.username}>
				{user.username}
			</Link>
			<Button className={styles.button} onClick={logout}>
				logout
			</Button>
		</div>
	);
};
