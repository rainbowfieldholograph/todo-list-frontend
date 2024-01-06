import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Button, Modal } from '~/shared/ui';
import { TodoEditorForm } from './todo-editor-form';

type FormSubmit = ComponentProps<typeof TodoEditorForm>['onSubmit'];
type TodoEditorProps = {
	initialTitle: string;
	initialDescription: string;
	loading: boolean;
	onSubmit: FormSubmit;
};

export const TodoEditor = ({
	initialDescription,
	initialTitle,
	loading,
	onSubmit,
}: TodoEditorProps) => {
	const [modal, setModal] = useState(false);

	const handleSubmit: FormSubmit = async (fields) => {
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
