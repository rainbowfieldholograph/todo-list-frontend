import { reatomComponent } from '@reatom/npm-react';
import { ComponentProps } from 'react';

import type { Todo } from '../../../model';

import {
	RemoveTodo,
	TodoEditor,
	TodoItem as TodoItemDumb,
	ToggleTodo,
} from '../../dumb';
import styles from './todo-item.module.css';

type TodoItemProps = Todo;
type Submit = ComponentProps<typeof TodoEditor>['onSubmit'];

export const TodoItem = reatomComponent<TodoItemProps>(({ ctx, ...props }) => {
	const {
		completedAtom,
		descriptionAtom,
		remove,
		titleAtom,
		toggle,
		updateDescription,
		updateTitle,
	} = props;

	const title = ctx.spy(titleAtom);
	const completed = ctx.spy(completedAtom);
	const description = ctx.spy(descriptionAtom);

	const removing = ctx.spy(remove.statusesAtom).isPending;
	const toggling = ctx.spy(toggle.statusesAtom).isPending;
	const editing =
		ctx.spy(updateDescription.statusesAtom).isPending ||
		ctx.spy(updateTitle.statusesAtom).isPending;

	const handleSubmit: Submit = ({ description, title }) => {
		updateTitle(ctx, title);
		updateDescription(ctx, description);
	};

	return (
		<TodoItemDumb
			completed={completed}
			description={description}
			loading={false}
			title={title}
		>
			<div className={styles.buttons}>
				<RemoveTodo loading={removing} onRemove={() => remove(ctx)} />
				<TodoEditor
					initialDescription={description}
					initialTitle={title}
					loading={editing}
					onSubmit={handleSubmit}
				/>
			</div>
			<ToggleTodo
				completed={completed}
				loading={toggling}
				onToggle={() => toggle(ctx)}
			/>
		</TodoItemDumb>
	);
}, 'TodoItem');
