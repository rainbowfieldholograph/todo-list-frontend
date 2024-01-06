import type { FormEventHandler } from 'react';
import { useState } from 'react';
import { Button, Form, Input, TextArea } from '~/shared/ui';

type TodoEditorFormProps = {
	title: string;
	description: string;
	loading: boolean;
	onSubmit: (fields: { title: string; description: string }) => void;
};

export const TodoEditorForm = (props: TodoEditorFormProps) => {
	const { description, title, loading, onSubmit } = props;
	const [updateTitle, setUpdateTitle] = useState(title);
	const [updateDescription, setUpdateDescription] = useState(description);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		onSubmit({ title: updateTitle, description: updateDescription });
	};

	return (
		<Form.Root onSubmit={handleSubmit}>
			<Form.Fields>
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
			</Form.Fields>
			<Button disabled={loading}>Update todo</Button>
		</Form.Root>
	);
};
