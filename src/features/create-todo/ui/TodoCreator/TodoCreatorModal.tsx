import { FC, FormEvent } from 'react';
import { Input, TextArea, Button, Form, ErrorStroke } from 'shared/ui';
import { createTodoAction } from 'entities/todo';
import { useAction, useAtom } from '@reatom/npm-react';
import { atom, reatomAsync, withReset } from '@reatom/framework';
import styles from './TodoCreatorModal.module.css';

type TodoCreatorModalProps = {
  onClose: () => void;
};

const titleAtom = atom('').pipe(withReset());
const descriptionAtom = atom('').pipe(withReset());

const submitActionCreator = reatomAsync(
  async (
    ctx,
    event: FormEvent<HTMLFormElement>,
    onSuccess: (...args: any) => any
  ) => {
    event.preventDefault();

    const title = ctx.get(titleAtom);
    const description = ctx.get(descriptionAtom);

    try {
      await createTodoAction(ctx, { description, title });

      onSuccess();

      titleAtom.reset(ctx);
      descriptionAtom.reset(ctx);
    } catch (error) {
      console.error(error);
    }
  }
);

const TitleField: FC = () => {
  const [title, setTitle] = useAtom(titleAtom);
  const [loading] = useAtom((ctx) => ctx.spy(createTodoAction.pendingAtom) > 0);

  return (
    <Input
      label="Title"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      type="text"
      disabled={loading}
      required
    />
  );
};

const DescriptionField: FC = () => {
  const [description, setDescription] = useAtom(descriptionAtom);
  const [loading] = useAtom((ctx) => ctx.spy(createTodoAction.pendingAtom) > 0);

  return (
    <TextArea
      label="Description:"
      value={description}
      onChange={(event) => setDescription(event.target.value)}
      disabled={loading}
      required
    />
  );
};

export const TodoCreatorModal: FC<TodoCreatorModalProps> = ({ onClose }) => {
  const [loading] = useAtom((ctx) => ctx.spy(createTodoAction.pendingAtom) > 0);
  const [error] = useAtom((ctx) => ctx.spy(createTodoAction.errorAtom));
  const handleSubmit = useAction(submitActionCreator);

  return (
    <>
      <Form border={false} onSubmit={(event) => handleSubmit(event, onClose)}>
        <h1 className={styles.title}>Create new Todo form</h1>
        <Form.Fields>
          <TitleField />
          <DescriptionField />
        </Form.Fields>
        <div className={styles.buttons}>
          <Button type="button" onClick={onClose}>
            Go Back
          </Button>
          <Button type="submit" disabled={loading}>
            Create
          </Button>
        </div>
        <ErrorStroke className={styles.error}>{error}</ErrorStroke>
      </Form>
    </>
  );
};
