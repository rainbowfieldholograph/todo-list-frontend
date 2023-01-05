import { AuthLayout } from 'shared/ui';
import { SignUpForm } from 'features/auth';
import { FC } from 'react';

export const SignUp: FC = () => {
	return (
		<AuthLayout title="SignUp">
			<SignUpForm />
		</AuthLayout>
	);
};
