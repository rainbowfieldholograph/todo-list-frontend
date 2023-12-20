import { AuthLayout } from 'shared/ui';
import { SignUpForm } from 'user/components/sign-up-form';
import { FC } from 'react';

export const SignUp: FC = () => {
	return (
		<AuthLayout title="SignUp">
			<SignUpForm />
		</AuthLayout>
	);
};
