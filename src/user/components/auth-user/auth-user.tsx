import { AxiosError } from 'axios';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { login } from '../../model';
import { Button, Input, Form, ErrorStroke } from 'shared/ui';
import { useAction, useAtom } from '@reatom/npm-react';
import styles from './auth-user.module.css';

export const AuthForm: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading] = useAtom((ctx) => ctx.spy(login.pendingAtom) > 0);
	const loginUser = useAction(login);

	const clearStatements = () => {
		setEmail('');
		setPassword('');
		setError(null);
	};

	const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await loginUser({ email, password });

			clearStatements();
		} catch (error) {
			if (!(error instanceof AxiosError)) return;

			const errorMessage = error.response?.statusText ?? error.message;

			console.error(errorMessage);
			setError(errorMessage);
		}
	};

	const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	return (
		<Form.Root onSubmit={handleSubmitForm}>
			<Form.Fields>
				<Input
					required
					label="Email:"
					type="email"
					value={email}
					onChange={onChangeEmail}
					disabled={loading}
				/>
				<Input
					label="Password:"
					type="password"
					value={password}
					onChange={onChangePassword}
					disabled={loading}
					required
				/>
			</Form.Fields>
			<Button disabled={loading} block type="submit">
				Submit
			</Button>
			<ErrorStroke className={styles.error} textCenter>
				{error}
			</ErrorStroke>
		</Form.Root>
	);
};
