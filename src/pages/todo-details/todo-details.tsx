import { useId } from 'react';
import { reatomComponent, useAtom, useUpdate } from '@reatom/npm-react';
import type { TodoDTO } from '~/todo/types';
import { todoPageIdAtom, todoPageResource } from '~/todo/model';

type TodoProps = { todoId: TodoDTO['_id'] };

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
	const completed = ctx.spy(todoData.completedAtom);

	return (
		<div key={containerId}>
			<>
				<h1>{title}</h1>
				<p>{description}</p>
				<p>is completed?: {String(completed)}</p>
			</>
		</div>
	);
}, 'TodoDetails');
