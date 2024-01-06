import { reatomComponent } from '@reatom/npm-react';
import { Link } from 'wouter';
import type { Todo } from '../../../model';
import { TodoEditor } from '../../dumb';
import { RemoveTodo, TodoItem as TodoItemDumb, ToggleTodo } from '../../dumb';

type TodoItemProps = Todo;

export const TodoItem = reatomComponent<TodoItemProps>(({ ctx, ...props }) => {
	const { completedAtom, descriptionAtom, remove, titleAtom, toggle, update } =
		props;

	const title = ctx.spy(titleAtom);
	const completed = ctx.spy(completedAtom);
	const description = ctx.spy(descriptionAtom);
	const removing = ctx.spy(remove.statusesAtom).isPending;
	const editing = ctx.spy(update.statusesAtom).isPending;
	const toggling = ctx.spy(toggle.statusesAtom).isPending;

	return (
		<TodoItemDumb
			completed={completed}
			description={description}
			title={title}
			actionsSlot={
				<>
					<RemoveTodo loading={removing} onRemove={ctx.bind(remove)} />
					<TodoEditor
						initialDescription={description}
						initialTitle={title}
						loading={editing}
						onSubmit={ctx.bind(update)}
					/>
				</>
			}
			endVerticalSlot={
				<ToggleTodo
					completed={completed}
					loading={toggling}
					onToggle={ctx.bind(toggle)}
					label={null}
				/>
			}
		/>
	);
}, 'TodoItem');
