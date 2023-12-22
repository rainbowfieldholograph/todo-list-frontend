import type { FormEventHandler } from 'react';
import { useState } from 'react';
import { useAction, useAtom } from '@reatom/npm-react';
import { Button, Form, Input } from '~/shared/ui';
import { onChangeCredentials, userAtom } from '../../model';

type EditUserFormProps = {
	onSubmit: () => void;
};

export const EditUserForm = ({ onSubmit }: EditUserFormProps) => {
	const [user] = useAtom(userAtom);
	const updateUser = useAction(onChangeCredentials);
	const [loading] = useAtom(
		(ctx) => ctx.spy(onChangeCredentials.pendingAtom) > 0,
	);

	if (!user) return null;

	const [usernameCandidate, setUsernameCandidate] = useState(user.username);
	const [emailCandidate, setEmailCandidate] = useState(user.email);

	const handleSubmitUser: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		try {
			await updateUser({
				email: emailCandidate,
				username: usernameCandidate,
			});
		} catch (error) {
			console.error(error);
		}

		onSubmit();
	};

	return (
		<Form.Root border={false} onSubmit={handleSubmitUser}>
			<Form.Fields>
				<Input
					disabled={loading}
					label="Username"
					value={usernameCandidate}
					onChange={(event) => setUsernameCandidate(event.target.value)}
				/>
				<Input
					disabled={loading}
					label="Email"
					value={emailCandidate}
					onChange={(event) => setEmailCandidate(event.target.value)}
				/>
			</Form.Fields>
			<Button block disabled={loading} type="submit">
				Submit
			</Button>
		</Form.Root>
	);
};
