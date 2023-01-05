import { NavLink as RouterNavLink, useMatch } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react';
import styles from './NavLink.module.css';

type NavLinkProps = PropsWithChildren<{ to: string }>;

export const NavLink: FC<NavLinkProps> = ({ to, children }) => {
  const match = useMatch(to);
  const attrs = match && ({ 'aria-current': 'page' } as const);

  return (
    <RouterNavLink {...attrs} className={styles.link} to={to}>
      {children}
    </RouterNavLink>
  );
};
