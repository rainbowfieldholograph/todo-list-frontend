import { reatomComponent } from '@reatom/npm-react';
import { Link } from 'wouter';
import type { Todo } from '../../../model';
import { TodoEditor } from '../../dumb';
import { RemoveTodo, TodoItem as TodoItemDumb, ToggleTodo } from '../../dumb';

type TodoItemProps = Todo;

export const TodoItem = reatomComponent<TodoItemProps>(({ ctx, ...props }) => {
	const {
		id,
		completedAtom,
		descriptionAtom,
		remove,
		titleAtom,
		toggle,
		update,
	} = props;

	const title = ctx.spy(titleAtom);
	const completed = ctx.spy(completedAtom);
	const description = ctx.spy(descriptionAtom);

	return (
		<TodoItemDumb
			completed={completed}
			description={description}
			title={title}
			slot={{
				Title: ({ slot, ...props }) => {
					return slot({
						...props,
						children: <Link to={`todo/${id}`}>{props.children}</Link>,
					});
				},
			}}
			actionsEndSlot={
				<ToggleTodo
					completed={completed}
					loading={ctx.spy(toggle.statusesAtom).isPending}
					onToggle={ctx.bind(toggle)}
				/>
			}
			actionsStartSlot={
				<>
					<RemoveTodo
						loading={ctx.spy(remove.statusesAtom).isPending}
						onRemove={ctx.bind(remove)}
					/>
					<TodoEditor
						initialDescription={description}
						initialTitle={title}
						loading={ctx.spy(update.statusesAtom).isPending}
						onSubmit={ctx.bind(update)}
					/>
				</>
			}
		/>
	);
}, 'TodoItem');
