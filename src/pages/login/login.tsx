import { AuthLayout } from '~/shared/view';
import { AuthUser } from '~/user/view';

export const Login = () => {
	return (
		<AuthLayout title="Login">
			<AuthUser />
		</AuthLayout>
	);
};
