import { FC, memo } from 'react';
import { useAtom } from '@reatom/npm-react';
import { onFetchTodos, Todo } from '../../model';
import { TodoItem } from '../todo-item';
import { RemoveTodo, ToggleTodo, EditTodo } from '..';
import styles from './todo-list.module.css';

const NoTodos = () => {
	return (
		<div>
			<p>{"You don't have todo's yet"}</p>
		</div>
	);
};

type TodoCardProps = {
	todo: Todo;
};

const TodoCard = memo(({ todo }: TodoCardProps) => {
	const {
		title: titleAtom,
		completed: completedAtom,
		description: descriptionAtom,
		remove,
		toggle,
	} = todo;

	const [title] = useAtom(titleAtom);
	const [completed] = useAtom(completedAtom);
	const [description] = useAtom(descriptionAtom);

	return (
		<TodoItem
			title={title}
			completed={completed}
			description={description}
			loading={false}
		>
			<div className={styles.buttons}>
				<RemoveTodo remove={remove} />
				<EditTodo todo={todo} />
			</div>
			<ToggleTodo completed={completed} toggle={toggle} />
		</TodoItem>
	);
});

export const TodoList: FC = () => {
	// const [currentSort] = useAtom(todoSortAtom);
	const [todoItems] = useAtom(onFetchTodos.dataAtom);
	const [loading] = useAtom((ctx) => ctx.spy(onFetchTodos.pendingAtom) > 0);
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
