import { useAction, useAtom } from '@reatom/npm-react';
import { Todo } from '../../model';
import { FormEventHandler, useState } from 'react';
import { Button, Form, Input, TextArea } from 'shared/ui';

type EditTodoFormProps = {
	title: string;
	description: string;
	update: Todo['update'];
	onSubmit: () => void;
};

export const EditTodoForm = ({
	description,
	title,
	update,
	onSubmit,
}: EditTodoFormProps) => {
	const [updateTitle, setUpdateTitle] = useState(title);
	const [updateDescription, setUpdateDescription] = useState(description);
	const handleUpdate = useAction(update);
	const [loading] = useAtom((ctx) => ctx.spy(update.pendingAtom) > 0);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		await handleUpdate({ title: updateTitle, description: updateDescription });

		onSubmit();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form>
				<Input
					label="Title"
					value={updateTitle}
					onChange={(event) => setUpdateTitle(event.target.value)}
				/>
				<TextArea
					label="Description"
					value={updateDescription}
					onChange={(event) => setUpdateDescription(event.target.value)}
				/>
			</Form>
			<Button disabled={loading}>Update todo</Button>
		</Form>
	);
};
