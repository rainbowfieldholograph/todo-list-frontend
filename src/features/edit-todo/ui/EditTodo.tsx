import { Todo } from 'entities/todo';
import { useState } from 'react';
import { Button, Modal } from 'shared/ui';
import { EditTodoForm } from './EditTodoForm';

type EditTodoProps = {
	todo: Todo;
};

export const EditTodo = ({ todo }: EditTodoProps) => {
	const [modal, setModal] = useState(false);

	return (
		<>
			<Button onClick={() => setModal(true)}>edit</Button>
			<Modal isOpened={modal} onClose={() => setModal(false)}>
				<EditTodoForm
					description={todo.description}
					title={todo.title}
					update={todo.update}
					onSubmit={() => setModal(false)}
				/>
			</Modal>
		</>
	);
};
