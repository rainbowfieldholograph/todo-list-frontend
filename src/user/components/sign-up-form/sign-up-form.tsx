import { Button, Form, Input } from 'shared/ui';
import { FC, FormEvent, useState } from 'react';
import { useAction, useAtom } from '@reatom/npm-react';
import { onSignUp } from 'user/model';

export const SignUpForm: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const handleSignUp = useAction(onSignUp);
	const [loading] = useAtom((ctx) => ctx.spy(onSignUp.pendingAtom) > 0);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await handleSignUp({ email, password, username });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form>
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
			</Form>
			<Button block type="submit" disabled={loading}>
				Submit
			</Button>
		</Form>
	);
};
