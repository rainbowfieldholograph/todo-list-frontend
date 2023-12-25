import { lazily } from 'react-lazily';
import { useAtom } from '@reatom/npm-react';
import { Switch, Route } from 'wouter';
import { routeMap } from '~/shared/config';
import { isLoggedAtom } from '~/user/model';
import { Layout } from './layout';

const { Welcome } = lazily(() => import('./welcome'));
const { Login } = lazily(() => import('./login'));
const { TodoPage } = lazily(() => import('./todo-page'));
const { NotFound } = lazily(() => import('./not-found'));
const { SignUp } = lazily(() => import('./sign-up'));
const { UserPage } = lazily(() => import('./user-page'));

export const Routing = () => {
	const [logged] = useAtom(isLoggedAtom);

	return (
		<Layout>
			<Switch>
				<Route path={routeMap.home} component={Welcome} />
				{logged ? (
					<>
						<Route path={routeMap.todo} component={TodoPage} />
						<Route path={routeMap.userPage} component={UserPage} />
					</>
				) : (
					<>
						<Route path={routeMap.signUp} component={SignUp} />
						<Route path={routeMap.login} component={Login} />
					</>
				)}
				<Route component={NotFound} />
			</Switch>
		</Layout>
	);
};
