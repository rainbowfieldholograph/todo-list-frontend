import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useAction, useAtom } from '@reatom/npm-react';
import { Button, ErrorStroke, Form, Input } from '~/shared/view';
import { signUp } from '~/user/model';

export const SignUpForm: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const handleSignUp = useAction(signUp);
	const [error] = useAtom(signUp.errorAtom);
	const [loading] = useAtom((ctx) => ctx.spy(signUp.pendingAtom) > 0);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await handleSignUp({ email, password, username });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form.Root onSubmit={handleSubmit}>
			<Form.Fields>
				<Input
					required
					label="Email:"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					disabled={loading}
				/>
				<Input
					required
					label="Username:"
					type="text"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
					disabled={loading}
				/>
				<Input
					label="Password:"
					type="password"
					value={password}
					required
					onChange={(event) => setPassword(event.target.value)}
					disabled={loading}
				/>
			</Form.Fields>
			<Button block type="submit" disabled={loading}>
				Submit
			</Button>
			<ErrorStroke style={{ marginTop: '1rem' }} textCenter>
				{error?.message}
			</ErrorStroke>
		</Form.Root>
	);
};
