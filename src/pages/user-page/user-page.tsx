import { useAtom } from '@reatom/npm-react';
import { EditUser, RemoveAccountButton } from '~/user/components';
import { userResource } from '~/user/model';
import styles from './user-page.module.css';

export const UserPage = () => {
	const [user] = useAtom(userResource.dataAtom);

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
