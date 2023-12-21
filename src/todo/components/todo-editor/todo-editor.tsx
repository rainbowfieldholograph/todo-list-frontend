import { useState } from 'react';
import { Button, Modal } from 'shared/ui';
import { TodoEditorForm, FieldsToUpdate } from './todo-editor-form';

type TodoEditorProps = {
	initialTitle: string;
	initialDescription: string;
	loading: boolean;
	onSubmit: (fields: FieldsToUpdate) => void;
};

export const TodoEditor = ({
	initialDescription,
	initialTitle,
	loading,
	onSubmit,
}: TodoEditorProps) => {
	const [modal, setModal] = useState(false);

	const handleSubmit = (fields: FieldsToUpdate) => {
		onSubmit(fields);
		setModal(false);
	};

	return (
		<>
			<Button disabled={loading} onClick={() => setModal(true)}>
				edit
			</Button>
			<Modal isOpened={modal} onClose={() => setModal(false)}>
				<TodoEditorForm
					description={initialDescription}
					title={initialTitle}
					onSubmit={handleSubmit}
					loading={loading}
				/>
			</Modal>
		</>
	);
};
