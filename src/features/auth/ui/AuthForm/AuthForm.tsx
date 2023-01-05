import { AxiosError } from 'axios';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { loginAction } from 'entities/user';
import { Button, Input, Form, ErrorStroke } from 'shared/ui';
import { useAction } from '@reatom/npm-react';
import styles from './AuthForm.module.css';

export const AuthForm: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const loginUser = useAction(loginAction);

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
		<Form onSubmit={handleSubmitForm}>
			<Form.Fields>
				<Input
					required
					label="Email:"
					type="email"
					value={email}
					onChange={onChangeEmail}
				/>
				<Input
					label="Password:"
					type="password"
					value={password}
					onChange={onChangePassword}
					required
				/>
			</Form.Fields>
			<Button block type="submit">
				Submit
			</Button>
			<ErrorStroke className={styles.error} textCenter>
				{error}
			</ErrorStroke>
		</Form>
	);
};
