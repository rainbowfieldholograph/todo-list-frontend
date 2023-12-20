import { useAtom } from '@reatom/npm-react';
import { Todo } from '../../model';
import { useState } from 'react';
import { Button, Modal } from 'shared/ui';
import { EditTodoForm } from './todo-editor-form';

type EditTodoProps = {
	todo: Todo;
};

export const EditTodo = ({ todo }: EditTodoProps) => {
	const [modal, setModal] = useState(false);
	const [description] = useAtom(todo.description);
	const [title] = useAtom(todo.title);

	return (
		<>
			<Button onClick={() => setModal(true)}>edit</Button>
			<Modal isOpened={modal} onClose={() => setModal(false)}>
				<EditTodoForm
					description={description}
					title={title}
					update={todo.update}
					onSubmit={() => setModal(false)}
				/>
			</Modal>
		</>
	);
};
