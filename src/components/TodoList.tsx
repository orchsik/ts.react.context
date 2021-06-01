import React, { ReactElement } from 'react';
import TodoItem from './TodoItem';

function TodoList(): ReactElement {
  const todos = [
    {
      id: 1,
      text: 'Context API 배우기',
      done: true,
    },
    {
      id: 2,
      text: 'Typescript 배우기',
      done: true,
    },
    {
      id: 3,
      text: 'Typescript 와 Context API 함께 사용하기',
      done: false,
    },
  ];

  return (
    <ul>
      {todos.map((todo) => {
        return <TodoItem todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;
