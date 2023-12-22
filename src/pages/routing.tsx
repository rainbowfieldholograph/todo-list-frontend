import { lazily } from 'react-lazily';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from '@reatom/npm-react';
import { routeMap } from '~/shared/config';
import { userAtom } from '~/user/model';
import { Layout } from './layout';

const { Welcome } = lazily(() => import('./welcome'));
const { Login } = lazily(() => import('./login'));
const { TodoPage } = lazily(() => import('./todo-page'));
const { NotFound } = lazily(() => import('./not-found'));
const { SignUp } = lazily(() => import('./sign-up'));
const { UserPage } = lazily(() => import('./user-page'));

export const Routing = () => {
	const [user] = useAtom(userAtom);

	const isAuth = Boolean(user);

	return (
		<Routes>
			<Route path={routeMap.home} element={<Layout />}>
				<Route index element={<Welcome />} />
				<Route
					path={routeMap.signUp}
					element={
						!isAuth ? <SignUp /> : <Navigate to={routeMap.todo} replace />
					}
				/>
				<Route
					path={routeMap.userPage}
					element={
						isAuth ? <UserPage /> : <Navigate to={routeMap.login} replace />
					}
				/>
				<Route
					path={routeMap.login}
					element={
						!isAuth ? <Login /> : <Navigate to={routeMap.todo} replace />
					}
				/>
				<Route
					path={routeMap.todo}
					element={
						isAuth ? <TodoPage /> : <Navigate to={routeMap.login} replace />
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};
