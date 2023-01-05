import { useAction, useAtom } from '@reatom/npm-react';
import { toggleTodoAction } from 'entities/todo';
import { FC, memo } from 'react';
import { Todo } from 'shared/types';

type ToggleTodoProps = {
  id: Todo['_id'];
  completion: boolean;
};

export const ToggleTodo: FC<ToggleTodoProps> = memo(({ id, completion }) => {
  const toggle = useAction(toggleTodoAction);
  const [loading] = useAtom((ctx) => ctx.spy(toggleTodoAction.pendingAtom) > 0);

  return (
    <label>
      <span>is completed: </span>
      <input
        disabled={loading}
        checked={completion}
        onChange={() => toggle(id)}
        type="checkbox"
      />
    </label>
  );
});
