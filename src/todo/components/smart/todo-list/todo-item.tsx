import type { ComponentProps } from 'react';
import { reatomComponent } from '@reatom/npm-react';
import { Link } from 'wouter';
import type { Todo } from '../../../model';
import { TodoEditor } from '../../dumb';
import { RemoveTodo, TodoItem as TodoItemDumb, ToggleTodo } from '../../dumb';

type TodoItemProps = Todo;
type Submit = ComponentProps<typeof TodoEditor>['onSubmit'];

export const TodoItem = reatomComponent<TodoItemProps>(({ ctx, ...props }) => {
	const {
		id,
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

	const handleSubmit: Submit = async ({ description, title }) => {
		return Promise.all([
			updateTitle(ctx, title),
			updateDescription(ctx, description),
		]);
	};

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
					loading={toggling}
					onToggle={() => toggle(ctx)}
				/>
			}
			actionsStartSlot={
				<>
					<RemoveTodo loading={removing} onRemove={() => remove(ctx)} />
					<TodoEditor
						initialDescription={description}
						initialTitle={title}
						loading={editing}
						onSubmit={handleSubmit}
					/>
				</>
			}
		/>
	);
}, 'TodoItem');
