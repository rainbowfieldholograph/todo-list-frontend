import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useAction, useAtom } from '@reatom/npm-react';
import { Button, Input, Form, ErrorStroke } from '~/shared/view';
import { login } from '../../model';
import styles from './auth-user.module.css';

export const AuthUser = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading] = useAtom((ctx) => ctx.spy(login.pendingAtom) > 0);
	const [error] = useAtom(login.errorAtom);
	const handleLogin = useAction(login);

	const clearStatements = () => {
		setEmail('');
		setPassword('');
	};

	const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		await handleLogin({ email, password });
		clearStatements();
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
				{error?.message}
			</ErrorStroke>
		</Form.Root>
	);
};
