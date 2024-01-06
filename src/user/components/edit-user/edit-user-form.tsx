import type { FormEventHandler } from 'react';
import { useState } from 'react';
import { useAction, useAtom } from '@reatom/npm-react';
import { Button, Form, Input } from '~/shared/ui';
import { changeCredentials, userResource } from '../../model';

type EditUserFormProps = {
	onSubmit: () => void;
};

export const EditUserForm = ({ onSubmit }: EditUserFormProps) => {
	const [user] = useAtom(userResource.dataAtom);
	const updateUser = useAction(changeCredentials);
	const [loading] = useAtom(
		(ctx) => ctx.spy(changeCredentials.pendingAtom) > 0,
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

			onSubmit();
		} catch (error) {
			console.error(error);
		}
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
