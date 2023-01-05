import { Todo } from 'shared/types';
import { apiInstance } from '../base';

export const toggleCompletedTodo = async (id: Todo['_id'], completion: boolean) => {
  const url = '/todo/' + id;

  return apiInstance.patch<Todo>(url, { completed: Boolean(completion) });
};
