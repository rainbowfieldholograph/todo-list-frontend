import { lazily } from 'react-lazily';
import { useAtom } from '@reatom/npm-react';
import { Switch, Route } from 'wouter';
import { isLoggedAtom } from '~/features/user/model';
import { Layout } from './layout';

const { Welcome } = lazily(() => import('./welcome'));
const { Login } = lazily(() => import('./login'));
const { TodoPage } = lazily(() => import('./todo-page'));
const { NotFound } = lazily(() => import('./not-found'));
const { SignUp } = lazily(() => import('./sign-up'));
const { UserPage } = lazily(() => import('./user-page'));
const { TodoDetails } = lazily(() => import('./todo-details'));

export const Routing = () => {
	const [logged] = useAtom(isLoggedAtom);

	return (
		<Layout>
			<Switch>
				<Route path="/" component={Welcome} />
				{logged ? (
					<>
						<Route path="/todo" component={TodoPage} />
						<Route path="/user" component={UserPage} />
					</>
				) : (
					<>
						<Route path="/sign-up" component={SignUp} />
						<Route path="/login" component={Login} />
					</>
				)}
				<Route path="/todo/:id">
					{(params) => <TodoDetails todoId={params.id} />}
				</Route>
				<Route component={NotFound} />
			</Switch>
		</Layout>
	);
};
