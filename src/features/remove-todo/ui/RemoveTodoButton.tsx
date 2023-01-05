import { useAction, useAtom } from '@reatom/npm-react';
import { removeTodoAction } from 'entities/todo';
import { Todo } from 'shared/types';
import { FC, memo, useState } from 'react';
import { Button } from 'shared/ui';

type RemoveTodoButtonProps = {
  id: Todo['_id'];
};

export const RemoveTodoButton: FC<RemoveTodoButtonProps> = memo(({ id }) => {
  const [removeTodoActionLocal] = useState(() => removeTodoAction);
  const handleRemoveTodo = useAction(removeTodoActionLocal);
  const [loading] = useAtom((ctx) => {
    return ctx.spy(removeTodoActionLocal.pendingAtom) > 0;
  });

  // console.log('loading: ', loading);

  return (
    <Button disabled={loading} onClick={() => handleRemoveTodo(id)}>
      remove
    </Button>
  );
});
