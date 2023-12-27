import type { Link } from 'wouter';
import type { ComponentProps } from 'react';
import clsx from 'clsx';
import { withSlot } from '~/shared/lib/hocs';
import { Button } from '~/shared/ui';
import { NavLink } from './nav-link';
import styles from './header.module.css';

type HeaderProps = { links: { title: string; to: string }[] };

type LogoutButtonProps = ComponentProps<typeof Button>;
const LogoutButton = (props: LogoutButtonProps) => (
	<Button {...props} className={clsx(styles.button, props.className)}>
		logout
	</Button>
);

type ProfileLinkProps = Omit<ComponentProps<typeof Link>, 'to'>;
const ProfileLink = (props: ProfileLinkProps) => (
	<NavLink
		{...props}
		href="/user"
		className={clsx(styles.username, props.className)}
	>
		{props.children}
	</NavLink>
);

const HeaderSlot = { LogoutButton, ProfileLink };
export const Header = withSlot<typeof HeaderSlot, HeaderProps>(
	HeaderSlot,
	({ slot, links }) => {
		const linkItems = links.map(({ title, to }) => {
			return (
				<li key={title + to}>
					<NavLink href={to}>{title}</NavLink>
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
