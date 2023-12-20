import { FC } from 'react';
import { Input, TextArea, Button, Form, ErrorStroke } from 'shared/ui';
import { onCreateTodo } from '../../model';
import { useAction, useAtom } from '@reatom/npm-react';
import { descriptionAtom, titleAtom, onSubmit } from './todo-creator.model';
import styles from './todo-creator-modal.module.css';

type TodoCreatorModalProps = {
	onClose: () => void;
};

const TitleField: FC = () => {
	const [title, setTitle] = useAtom(titleAtom);
	const [loading] = useAtom((ctx) => ctx.spy(onCreateTodo.pendingAtom) > 0);

	return (
		<Input
			label="Title"
			value={title}
			onChange={(event) => setTitle(event.target.value)}
			type="text"
			disabled={loading}
			required
		/>
	);
};

const DescriptionField: FC = () => {
	const [description, setDescription] = useAtom(descriptionAtom);
	const [loading] = useAtom((ctx) => ctx.spy(onCreateTodo.pendingAtom) > 0);

	return (
		<TextArea
			label="Description:"
			value={description}
			onChange={(event) => setDescription(event.target.value)}
			disabled={loading}
			required
		/>
	);
};

export const TodoCreatorModal: FC<TodoCreatorModalProps> = ({ onClose }) => {
	const [loading] = useAtom((ctx) => ctx.spy(onCreateTodo.pendingAtom) > 0);
	const [error] = useAtom((ctx) => ctx.spy(onCreateTodo.errorAtom));
	const handleSubmit = useAction(onSubmit);

	return (
		<>
			<Form border={false} onSubmit={(event) => handleSubmit(event, onClose)}>
				<h1 className={styles.title}>Create new Todo form</h1>
				<Form>
					<TitleField />
					<DescriptionField />
				</Form>
				<div className={styles.buttons}>
					<Button type="button" onClick={onClose}>
						Go Back
					</Button>
					<Button type="submit" disabled={loading}>
						Create
					</Button>
				</div>
				<ErrorStroke className={styles.error}>{error}</ErrorStroke>
			</Form>
		</>
	);
};
