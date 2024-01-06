import type { ComponentProps } from 'react';
import { memo, useState } from 'react';
import { useEvent } from '~/shared/lib/hooks';
import { Button, Dialog } from '~/shared/ui';
import { TodoEditorForm } from './todo-editor-form';

type FormSubmit = ComponentProps<typeof TodoEditorForm>['onSubmit'];
type TodoEditorProps = {
	initialTitle: string;
	initialDescription: string;
	loading: boolean;
	onSubmit: FormSubmit;
	buttonTitle?: string;
};

export const TodoEditor = memo(
	({
		initialDescription,
		initialTitle,
		loading,
		onSubmit,
		buttonTitle = 'edit',
	}: TodoEditorProps) => {
		const [dialogOpen, setDialogOpen] = useState(false);

		const handleSubmit: FormSubmit = useEvent(async (fields) => {
			onSubmit(fields);
			setDialogOpen(false);
		});

		return (
			<>
				<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
					<Dialog.Trigger asChild>
						<Button disabled={loading}>{buttonTitle}</Button>
					</Dialog.Trigger>
					<Dialog.Content>
						<TodoEditorForm
							description={initialDescription}
							title={initialTitle}
							onSubmit={handleSubmit}
							loading={loading}
						/>
					</Dialog.Content>
				</Dialog.Root>
			</>
		);
	},
);

TodoEditor.displayName = 'TodoEditor';
