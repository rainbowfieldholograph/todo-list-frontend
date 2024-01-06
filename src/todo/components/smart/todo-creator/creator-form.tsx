import { memo, type FormEvent } from 'react';
import { useAction, useAtom } from '@reatom/npm-react';
import { Input, TextArea, Button, Form, ErrorStroke } from '~/shared/ui';
import type { TodoCreatorFormModel } from './model';
import { createTodo } from '../../../model';
import styles from './creator-form.module.css';

type FieldProps = { model: TodoCreatorFormModel; loading: boolean };

const TitleField = memo(({ model, loading }: FieldProps) => {
	const [title, setTitle] = useAtom(model.titleAtom);

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
});
TitleField.displayName = 'TitleField';

const DescriptionField = memo(({ model, loading }: FieldProps) => {
	const [description, setDescription] = useAtom(model.descriptionAtom);

	return (
		<TextArea
			label="Description:"
			value={description}
			onChange={(event) => setDescription(event.target.value)}
			disabled={loading}
			required
		/>
	);
});
DescriptionField.displayName = 'DescriptionField';

type TodoCreatorFormProps = {
	model: TodoCreatorFormModel;
	onClose: () => any;
};
export const TodoCreatorForm = memo(
	({ onClose, model }: TodoCreatorFormProps) => {
		const [loading] = useAtom(
			(ctx) => ctx.spy(createTodo.statusesAtom).isPending,
		);
		const [error] = useAtom((ctx) => ctx.spy(createTodo.errorAtom));

		const handleSubmit = useAction(
			async (ctx, event: FormEvent<HTMLFormElement>) => {
				event.preventDefault();
				await createTodo(ctx, {
					description: ctx.get(model.descriptionAtom),
					title: ctx.get(model.titleAtom),
				});
				model.reset(ctx);
				onClose();
			},
		);

		return (
			<Form.Root border={false} onSubmit={handleSubmit}>
				<h1 className={styles.title}>Create new Todo form</h1>
				<Form.Fields>
					<TitleField loading={loading} model={model} />
					<DescriptionField loading={loading} model={model} />
				</Form.Fields>
				<div className={styles.buttons}>
					<Button type="button" onClick={onClose}>
						Go Back
					</Button>
					<Button type="submit" disabled={loading}>
						Create
					</Button>
				</div>
				<ErrorStroke className={styles.error}>{error?.message}</ErrorStroke>
			</Form.Root>
		);
	},
);
TodoCreatorForm.displayName = 'TodoCreatorModal';
