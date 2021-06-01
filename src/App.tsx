import Reat, { ReactElement } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = (): ReactElement => {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
};

export default App;
