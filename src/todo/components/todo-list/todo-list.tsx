import { useAction, useAtom } from '@reatom/npm-react';
import { getTodos, Todo } from '../../model';
import { TodoItem } from '../todo-item';
import { RemoveTodo, ToggleTodo, TodoEditor } from '..';
import { FieldsToUpdate } from '../todo-editor/todo-editor-form';
import styles from './todo-list.module.css';

const NoTodos = () => {
	return (
		<div>
			<p>{"You don't have todo's yet"}</p>
		</div>
	);
};

type TodoCardProps = { todo: Todo };

const TodoCard = ({ todo }: TodoCardProps) => {
	const {
		titleAtom,
		completedAtom,
		descriptionAtom,
		remove,
		toggle,
		updateDescription,
		updateTitle,
	} = todo;

	const [removing] = useAtom((ctx) => ctx.spy(remove.statusesAtom).isPending);
	const [toggling] = useAtom((ctx) => ctx.spy(toggle.statusesAtom).isPending);
	const [editing] = useAtom((ctx) => {
		return (
			ctx.spy(updateDescription.statusesAtom).isPending ||
			ctx.spy(updateTitle.statusesAtom).isPending
		);
	});
	const [title] = useAtom(titleAtom);
	const [completed] = useAtom(completedAtom);
	const [description] = useAtom(descriptionAtom);
	const handleRemove = useAction(remove);
	const handleToggle = useAction(toggle);
	const handleUpdateTitle = useAction(updateTitle);
	const handleUpdateDescription = useAction(updateDescription);

	const handleSubmit = ({ title, description }: FieldsToUpdate) => {
		handleUpdateTitle(title);
		handleUpdateDescription(description);
	};

	return (
		<TodoItem
			title={title}
			completed={completed}
			description={description}
			loading={false}
		>
			<div className={styles.buttons}>
				<RemoveTodo loading={removing} onRemove={handleRemove} />
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
				onToggle={handleToggle}
			/>
		</TodoItem>
	);
};

export const TodoList = () => {
	// const [currentSort] = useAtom(todoSortAtom);
	const [todoItems] = useAtom(getTodos.dataAtom);
	const [loading] = useAtom((ctx) => ctx.spy(getTodos.pendingAtom) > 0);
	// const ctx = useCtx();

	// const sortedTodos = useMemo(() => {
	// 	if (currentSort === 'Default') return todoItems;

	// 	const sortFunction = SORT_FUNCTIONS[currentSort];

	// 	return [...todoItems]
	// 		.map((todo) => {
	// 			return {
	// 				...todo,
	// 				description: ctx.get(todo.description),
	// 				completed: ctx.get(todo.completed),
	// 				title: ctx.get(todo.title),
	// 			};
	// 		})
	// 		.sort(sortFunction)
	// 		.map((todo) => {
	// 			return {
	// 				...todo,
	// 				description: atom(todo.description),
	// 				completed: atom(todo.completed),
	// 				title: atom(todo.title),
	// 			};
	// 		});
	// }, [currentSort, todoItems]);

	const todoListEmpty = todoItems.length === 0;

	if (loading) return <p>Todos loading...</p>;

	if (todoListEmpty) return <NoTodos />;

	const listItems = todoItems.map((todo) => (
		<li key={todo._id}>
			<TodoCard todo={todo} />
		</li>
	));

	return <ul className={styles.list}>{listItems}</ul>;
};
