import { AuthLayout } from '~/shared/ui';
import { SignUpForm } from '~/user/components';

export const SignUp = () => {
	return (
		<AuthLayout title="SignUp">
			<SignUpForm />
		</AuthLayout>
	);
};
