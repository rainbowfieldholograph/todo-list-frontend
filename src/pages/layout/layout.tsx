import { Suspense, type PropsWithChildren, useMemo } from 'react';
import { useAction, useAtom } from '@reatom/npm-react';
import { routeMap } from '~/shared/config';
import { Footer, Container, Header } from '~/shared/ui';
import { isLoggedAtom, logout, userResource } from '~/user/model';
import styles from './layout.module.css';

const generalLinks = [{ title: 'Start', to: routeMap.home }];
const unauthenticatedLinks = [
	{ title: 'Login', to: routeMap.login },
	{ title: 'SignUp', to: routeMap.signUp },
];
const authenticatedLinks = [{ title: 'Todo', to: routeMap.todo }];

const linksDict = {
	true: authenticatedLinks,
	false: unauthenticatedLinks,
} as const;

export const Layout = ({ children }: PropsWithChildren) => {
	const [logged] = useAtom(isLoggedAtom);
	const [username] = useAtom((ctx) => ctx.spy(userResource.dataAtom)?.username);
	const handleLogout = useAction(logout);
	const links = useMemo(
		() => [...generalLinks, ...linksDict[`${logged}`]],
		[logged],
	);

	return (
		<Container className={styles.wrapper}>
			<Header
				links={links}
				slot={{
					ProfileLink: ({ slot, ...props }) =>
						logged ? slot({ ...props, children: username }) : null,
					LogoutButton: ({ slot, ...props }) =>
						logged ? slot({ ...props, onClick: handleLogout }) : null,
				}}
			/>
			<main className={styles.content}>
				<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
			</main>
			<Footer />
		</Container>
	);
};
