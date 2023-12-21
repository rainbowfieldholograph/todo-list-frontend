import { FormEventHandler, useState } from 'react';
import { Button, Form, Input, TextArea } from 'shared/ui';

export type FieldsToUpdate = {
	title: string;
	description: string;
};

type TodoEditorFormProps = {
	title: string;
	description: string;
	loading: boolean;
	onSubmit: (fields: FieldsToUpdate) => void;
};

export const TodoEditorForm = ({
	description,
	title,
	loading,
	onSubmit,
}: TodoEditorFormProps) => {
	const [updateTitle, setUpdateTitle] = useState(title);
	const [updateDescription, setUpdateDescription] = useState(description);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		onSubmit({ title: updateTitle, description: updateDescription });
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
