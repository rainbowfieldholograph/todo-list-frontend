import { lazily } from 'react-lazily';
import { useAtom } from '@reatom/npm-react';
import { Switch, Route, Redirect } from 'wouter';
import { routeMap } from '~/shared/config';
import { userResource } from '~/user/model';
import { Layout } from './layout';

const { Welcome } = lazily(() => import('./welcome'));
const { Login } = lazily(() => import('./login'));
const { TodoPage } = lazily(() => import('./todo-page'));
const { NotFound } = lazily(() => import('./not-found'));
const { SignUp } = lazily(() => import('./sign-up'));
const { UserPage } = lazily(() => import('./user-page'));

export const Routing = () => {
	const [user] = useAtom(userResource.dataAtom);

	const isAuth = Boolean(user);

	return (
		<Switch>
			<Layout>
				<Route path={routeMap.home} component={Welcome} />
				<Route
					path={routeMap.signUp}
					component={
						!isAuth ? SignUp : () => <Redirect to={routeMap.todo} replace />
					}
				/>
				<Route
					path={routeMap.userPage}
					component={
						isAuth ? UserPage : () => <Redirect to={routeMap.login} replace />
					}
				/>
				<Route
					path={routeMap.login}
					component={
						!isAuth ? Login : () => <Redirect to={routeMap.todo} replace />
					}
				/>
				<Route
					path={routeMap.todo}
					component={
						isAuth ? TodoPage : () => <Redirect to={routeMap.login} replace />
					}
				/>
				<Route component={NotFound} />
			</Layout>
		</Switch>
	);
};
