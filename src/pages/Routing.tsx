import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { userAtom } from 'entities/user';
import { lazily } from 'react-lazily';
import { useAtom } from '@reatom/npm-react';

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
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="login"
          element={!isAuth ? <Login /> : <Navigate to="/todo" replace />}
        />
        <Route
          path="todo"
          element={isAuth ? <TodoPage /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
