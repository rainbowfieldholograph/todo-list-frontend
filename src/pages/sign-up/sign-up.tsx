import { SignUpForm } from '~/features/user/view';
import { AuthLayout } from '~/shared/view';

export const SignUp = () => {
	return (
		<AuthLayout title="SignUp">
			<SignUpForm />
		</AuthLayout>
	);
};
