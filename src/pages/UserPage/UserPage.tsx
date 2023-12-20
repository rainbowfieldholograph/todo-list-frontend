import { useAtom } from '@reatom/npm-react';
import { userAtom } from 'user/model';
import { EditUser, RemoveAccountButton } from 'user/components';
import styles from './UserPage.module.css';

export const UserPage = () => {
	const [user] = useAtom(userAtom);

	if (!user) return null;

	return (
		<>
			<div className={styles.credentials}>
				<p>Username: {user.username}</p>
				<p>Email: {user.email}</p>
			</div>
			<div className={styles.buttons}>
				<EditUser />
				<RemoveAccountButton />
			</div>
		</>
	);
};
