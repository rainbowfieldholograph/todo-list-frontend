import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { userAtom } from 'entities/user';
import { lazily } from 'react-lazily';
import { useAtom } from '@reatom/npm-react';
import { routeMap } from 'shared/config';

const { Welcome } = lazily(() => import('./Welcome'));
const { Login } = lazily(() => import('./Login'));
const { TodoPage } = lazily(() => import('./TodoPage'));
const { NotFound } = lazily(() => import('./NotFound'));
const { SignUp } = lazily(() => import('./SignUp'));

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
