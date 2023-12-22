import { Link, useRoute, type LinkProps } from 'wouter';
import clsx from 'clsx';
import styles from './nav-link.module.css';

type NavLinkProps = LinkProps & { href: string };

export const NavLink = ({ href, className, ...rest }: NavLinkProps) => {
	const [active] = useRoute(href);
	const attrs = active && ({ 'aria-current': 'page' } as const);

	return (
		<Link
			{...rest}
			className={clsx(styles.link, className)}
			href={href}
			{...attrs}
		/>
	);
};
