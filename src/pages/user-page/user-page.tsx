import { useAtom } from '@reatom/npm-react';
import { userResource } from '~/features/user/model';
import { EditUser, RemoveAccount } from '~/features/user/view';
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
				<RemoveAccount />
			</div>
		</>
	);
};
