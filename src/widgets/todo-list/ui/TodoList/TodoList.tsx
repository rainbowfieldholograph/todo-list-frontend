import { FC, memo, useEffect, useMemo } from 'react';
import { useAtom } from '@reatom/npm-react';
import { onFetchTodos, TodoItem } from 'entities/todo';
import { SORT_FUNCTIONS } from '../../config';
import { todoSortAtom } from '../../model';
import { RemoveTodoButton } from 'features/remove-todo';
import { ToggleTodo } from 'features/toggle-todo';
import { Todo } from 'entities/todo';
import styles from './TodoList.module.css';

const NoTodos = () => {
	return (
		<div>
			<p>{"You don't have todo's yet"}</p>
		</div>
	);
};

const TodoCard: FC<{ todo: Todo }> = memo(({ todo }) => {
	const { _id, title, completed, description, remove } = todo;

	return (
		<TodoItem
			title={title}
			completed={completed}
			description={description}
			loading={false}
		>
			<RemoveTodoButton id={_id} remove={remove} />
			<ToggleTodo completion={completed} id={_id} />
		</TodoItem>
	);
});

export const TodoList: FC = () => {
	const [currentSort] = useAtom(todoSortAtom);
	const [todoItems, setTodoItems] = useAtom(onFetchTodos.dataAtom);
	const [loading] = useAtom((ctx) => ctx.spy(onFetchTodos.pendingAtom) > 0);

	// useEffect(() => {
	// 	return () => {
	// 		setTodoItems([]);
	// 	};
	// }, []);

	const sortedTodos = useMemo(() => {
		if (currentSort === 'Default') return todoItems;

		const sortFunction = SORT_FUNCTIONS[currentSort];

		return [...todoItems].sort(sortFunction);
	}, [todoItems, currentSort]);

	const todoListEmpty = sortedTodos.length === 0;

	if (loading) return <p>Todos loading...</p>;

	if (todoListEmpty) return <NoTodos />;

	const listItems = sortedTodos.map((todo) => (
		<li key={todo._id}>
			<TodoCard todo={todo} />
		</li>
	));

	return <ul className={styles.list}>{listItems}</ul>;
};
