import { FC } from 'react';
import { AuthForm } from 'features/auth';
import { AuthLayout } from 'shared/ui';

export const Login: FC = () => {
  return (
    <AuthLayout title="Login">
      <AuthForm />
    </AuthLayout>
  );
};
