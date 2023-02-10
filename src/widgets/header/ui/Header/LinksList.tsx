import { FC } from 'react';
import { userAtom } from 'entities/user';
import { NavLink } from './NavLink';
import { useAtom } from '@reatom/npm-react';
import { routeMap } from 'shared/config';
import styles from './LinksList.module.css';

interface Link {
	title: string;
	to: string;
	needAuth?: boolean;
	hideWhenAuth?: boolean;
}

const LINKS: Link[] = [
	{ title: 'Start', to: routeMap.home },
	{ title: 'Login', to: routeMap.login, hideWhenAuth: true },
	{ title: 'Todo', to: routeMap.todo, needAuth: true },
	{ title: 'SignUp', to: routeMap.signUp, hideWhenAuth: true },
];

export const LinksList: FC = () => {
	const [user] = useAtom(userAtom);

	const isAuth = Boolean(user);

	const linkItems = LINKS.map(({ title, to, needAuth, hideWhenAuth }) => {
		const key = title + to;

		if ((needAuth && !isAuth) || (hideWhenAuth && isAuth)) return;

		return (
			<li key={key}>
				<NavLink to={to}>{title}</NavLink>
			</li>
		);
	});

	return (
		<nav>
			<ul className={styles.links}>{linkItems}</ul>
		</nav>
	);
};
