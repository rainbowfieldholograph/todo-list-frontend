import { FC } from 'react';
import { userAtom, logoutAction } from 'entities/user';
import { Button } from 'shared/ui';
import { useAction, useAtom } from '@reatom/npm-react';
import styles from './AuthSection.module.css';

export const AuthSection: FC = () => {
  const [user] = useAtom(userAtom);
  const logout = useAction(logoutAction);

  if (!user) return null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.username}>{user.username}</p>
      <Button variant="secondary" className={styles.button} onClick={logout}>
        logout
      </Button>
    </div>
  );
};
