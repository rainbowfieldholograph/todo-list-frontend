import { useId } from 'react';
import { reatomComponent, useAtom, useUpdate } from '@reatom/npm-react';
import type { TodoDTO } from '~/features/todo/types';
import { todoPageIdAtom, todoPageResource } from '~/features/todo/model';
import { TodoEditor, ToggleTodo } from '~/features/todo/view/dumb';
import styles from './todo-details.module.css';

type TodoProps = { todoId: TodoDTO['id'] };

export const TodoDetails = reatomComponent<TodoProps>(({ ctx, todoId }) => {
	const containerId = useId();
	const [_todoPageId, setTodoPageId] = useAtom(todoPageIdAtom);
	const loading = ctx.spy(todoPageResource.statusesAtom).isPending;
	const todoData = ctx.spy(todoPageResource.dataAtom);

	useUpdate(() => setTodoPageId(todoId), [todoId]);

	if (loading) return <div key={containerId}>Loading...</div>;
	if (!todoData) return <div key={containerId}>Todo not found</div>;

	const title = ctx.spy(todoData.titleAtom);
	const description = ctx.spy(todoData.descriptionAtom);

	return (
		<div key={containerId}>
			<div className={styles.head}>
				<h1 className={styles.title}>{title}</h1>
				<TodoEditor
					initialTitle={title}
					initialDescription={description}
					loading={ctx.spy(todoData.update.statusesAtom).isPending}
					onSubmit={ctx.bind(todoData.update)}
				/>
			</div>
			<div className={styles.descriptionSection}>
				<h2>Description: </h2>
				<p className={styles.description}>{description}</p>
			</div>
			<ToggleTodo
				completed={ctx.spy(todoData.completedAtom)}
				loading={ctx.spy(todoData.toggle.statusesAtom).isPending}
				onToggle={ctx.bind(todoData.toggle)}
			/>
		</div>
	);
}, 'TodoDetails');
