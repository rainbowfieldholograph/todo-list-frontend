import { FC, memo, useMemo } from 'react';
import { useAtom } from '@reatom/npm-react';
import { TodoItem, userTodosAtom } from 'entities/todo';
import { SORT_FUNCTIONS } from '../../config';
import { todoSortAtom } from '../../model';
import { RemoveTodoButton } from 'features/remove-todo';
import { ToggleTodo } from 'features/toggle-todo';
import { Todo } from 'shared/types';
import styles from './TodoList.module.css';

const NoTodos = () => {
  return (
    <div>
      <p>You don't have todo's yet</p>
    </div>
  );
};

const TodoCard: FC<{ todo: Todo }> = memo(({ todo }) => {
  const { _id, title, completed, description } = todo;

  return (
    <TodoItem
      title={title}
      completed={completed}
      description={description}
      loading={false}
    >
      <RemoveTodoButton id={_id} />
      <ToggleTodo completion={completed} id={_id} />
    </TodoItem>
  );
});

export const TodoList: FC = () => {
  const [currentSort] = useAtom(todoSortAtom);
  const [todoItems] = useAtom(userTodosAtom);

  const sortedTodos = useMemo(() => {
    if (currentSort === 'Default') return todoItems;

    const sortFunction = SORT_FUNCTIONS[currentSort];

    return [...todoItems].sort(sortFunction);
  }, [todoItems, currentSort]);

  const todoListEmpty = sortedTodos.length === 0;

  if (todoListEmpty) return <NoTodos />;

  const items = sortedTodos.map((todo) => (
    <li key={todo._id}>
      <TodoCard todo={todo} />
    </li>
  ));

  return <ul className={styles.list}>{items}</ul>;
};
