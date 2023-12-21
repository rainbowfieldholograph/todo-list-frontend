import { reatomComponent } from '@reatom/npm-react';
import {
	RemoveTodo,
	TodoEditor,
	TodoItem as TodoItemDumb,
	ToggleTodo,
} from 'todo/components/dumb';
import { Todo } from 'todo/model';
import { ComponentProps } from 'react';
import styles from './todo-item.module.css';

type TodoItemProps = Todo;
type Submit = ComponentProps<typeof TodoEditor>['onSubmit'];

export const TodoItem = reatomComponent<TodoItemProps>(({ ctx, ...props }) => {
	const {
		completedAtom,
		descriptionAtom,
		remove,
		toggle,
		updateDescription,
		updateTitle,
		titleAtom,
	} = props;

	const title = ctx.spy(titleAtom);
	const completed = ctx.spy(completedAtom);
	const description = ctx.spy(descriptionAtom);

	const removing = ctx.spy(remove.statusesAtom).isPending;
	const toggling = ctx.spy(toggle.statusesAtom).isPending;
	const editing =
		ctx.spy(updateDescription.statusesAtom).isPending ||
		ctx.spy(updateTitle.statusesAtom).isPending;

	const handleSubmit: Submit = ({ title, description }) => {
		updateTitle(ctx, title);
		updateDescription(ctx, description);
	};

	return (
		<TodoItemDumb
			title={title}
			completed={completed}
			description={description}
			loading={false}
		>
			<div className={styles.buttons}>
				<RemoveTodo loading={removing} onRemove={() => remove(ctx)} />
				<TodoEditor
					onSubmit={handleSubmit}
					initialDescription={description}
					initialTitle={title}
					loading={editing}
				/>
			</div>
			<ToggleTodo
				loading={toggling}
				completed={completed}
				onToggle={() => toggle(ctx)}
			/>
		</TodoItemDumb>
	);
}, 'TodoItem');
