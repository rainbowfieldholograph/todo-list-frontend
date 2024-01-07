import { AuthLayout } from '~/shared/view';
import { SignUpForm } from '~/user/view';

export const SignUp = () => {
	return (
		<AuthLayout title="SignUp">
			<SignUpForm />
		</AuthLayout>
	);
};
