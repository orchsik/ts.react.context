import { ReactElement } from 'react';

import { useTodosState } from '../context/TodosContext';
import TodoItem from './TodoItem';

function TodoList(): ReactElement {
  const todos = useTodosState();

  return (
    <ul>
      {todos.map((todo) => {
        return <TodoItem todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;
