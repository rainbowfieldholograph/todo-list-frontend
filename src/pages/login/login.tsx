import { AuthLayout } from '~/shared/ui';
import { AuthForm } from '~/user/components';

export const Login = () => {
	return (
		<AuthLayout title="Login">
			<AuthForm />
		</AuthLayout>
	);
};
