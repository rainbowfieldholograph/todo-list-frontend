import { FC } from 'react';
import { TodoCreator } from 'features/create-todo';
import { TodoList, TodoSort } from 'widgets/todo-list';
import styles from './TodoPage.module.css';

export const TodoPage: FC = () => {
  return (
    <div>
      <div className={styles.head}>
        <h2>This is todo page</h2>
        <TodoCreator />
      </div>
      <TodoSort />
      <TodoList />
    </div>
  );
};
