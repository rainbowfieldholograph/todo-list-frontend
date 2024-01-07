import { AuthUser } from '~/features/user/view';
import { AuthLayout } from '~/shared/view';

export const Login = () => {
	return (
		<AuthLayout title="Login">
			<AuthUser />
		</AuthLayout>
	);
};
