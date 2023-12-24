import { AuthLayout } from '~/shared/ui';
import { AuthUser } from '~/user/components';

export const Login = () => {
	return (
		<AuthLayout title="Login">
			<AuthUser />
		</AuthLayout>
	);
};
