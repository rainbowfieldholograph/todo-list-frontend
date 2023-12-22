import { ComponentProps } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { routeMap } from 'shared/config';
import { withSlot } from 'shared/lib/hocs';
import { Button } from 'shared/ui';

import styles from './header.module.css';
import { NavLink } from './nav-link';

type HeaderProps = { links: { title: string; to: string }[] };

type LogoutButtonProps = ComponentProps<typeof Button>;
const LogoutButton = (props: LogoutButtonProps) => (
	<Button {...props} className={clsx(styles.button, props.className)}>
		logout
	</Button>
);

type ProfileLinkProps = Omit<ComponentProps<typeof Link>, 'to'>;
const ProfileLink = (props: ProfileLinkProps) => (
	<Link
		{...props}
		to={routeMap.userPage}
		className={clsx(styles.username, props.className)}
	>
		{props.children}
	</Link>
);

const HeaderSlot = { LogoutButton, ProfileLink };
export const Header = withSlot<typeof HeaderSlot, HeaderProps>(
	HeaderSlot,
	({ slot, links }) => {
		const linkItems = links.map(({ title, to }) => {
			return (
				<li key={title + to}>
					<NavLink to={to}>{title}</NavLink>
				</li>
			);
		});

		return (
			<header className={styles.header}>
				<nav>
					<ul className={styles.links}>{linkItems}</ul>
				</nav>
				<div className={styles.authSection}>
					<slot.ProfileLink />
					<slot.LogoutButton />
				</div>
			</header>
		);
	},
);
