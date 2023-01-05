import { clsx } from 'clsx';
import { FC, memo, PropsWithChildren } from 'react';
import styles from './TodoItem.module.css';

type TodoItemProps = PropsWithChildren<{
  title: string;
  description: string;
  completed: boolean;
  loading: boolean;
}>;

export const TodoItem: FC<TodoItemProps> = memo(
  ({ completed, description, title, children }) => {
    console.log('rerender TodoItem');

    return (
      <article className={clsx(styles.todo, { [styles.completed]: completed })}>
        <div className={styles.meta}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className={styles.actions}>{children}</div>
      </article>
    );
  }
);
