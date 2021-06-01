import { ReactElement } from 'react';

import { TodosContextProvider } from './context/TodosContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = (): ReactElement => {
  return (
    <TodosContextProvider>
      <TodoForm />
      <TodoList />
    </TodosContextProvider>
  );
};

export default App;
