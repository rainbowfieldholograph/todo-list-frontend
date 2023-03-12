import { AuthLayout } from 'shared/ui';
import { SignUpForm } from 'features/user';
import { FC } from 'react';

export const SignUp: FC = () => {
	return (
		<AuthLayout title="SignUp">
			<SignUpForm />
		</AuthLayout>
	);
};
