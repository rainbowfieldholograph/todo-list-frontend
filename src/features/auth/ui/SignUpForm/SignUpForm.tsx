import { Button, Form, Input } from 'shared/ui';
import { FC } from 'react';

export const SignUpForm: FC = () => {
  return (
    <Form>
      <Form.Fields>
        <Input required label="Email:" type="email" value={''} onChange={() => {}} />
        <Input
          label="Password:"
          type="password"
          value={''}
          onChange={() => {}}
          required
        />
      </Form.Fields>
      <Button block type="submit">
        Submit
      </Button>
    </Form>
  );
};
