/*
TodosContext.tsx 파일 안에 두 개의 Context를 만든다.
하나는 상태 전용 Context, 또 다른 하나는 Dispatch 전용 Context.
이렇게 하면 낭비 렌더링을 방지할 수 있다.
*/
import {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useReducer,
} from 'react';

/*
 * TodosStateContext
 */
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodosState = Todo[];

// Generic을 사용하여 Context에서 관리할 값의 상태를 설정할 수 있다.
const TodosStateContext = createContext<TodosState | undefined>(undefined);

/*
 *  TodosDispatchContext
 */
type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

// 이렇게 React.Dispatch에 Generic으로 액션의 타입을 넣어주면
// 추후에 액션을 디스패치할 때 액션에 대한 타입을 검사할 수 있다.
// 예를 들어, 액션에 추가적으로 필요한 값(예: text, id)이 빠지면 오류 발생.
type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext =
  createContext<TodosDispatch | undefined>(undefined);

function todosReducer(state: TodosState, action: Action): TodosState {
  switch (action.type) {
    case 'CREATE':
      const nextId = Math.max(...state.map((todo) => todo.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.text,
        done: false,
      });
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error('Unhandled action');
  }
}

/**
 * TodosProvider
 * TodosStateContext, TodosDispatchContext의 Provider를 함께 사용하는
 * TodosProvider라는 컴포는틑 준비한다.
 */
export function TodosContextProvider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const initialState = [
    {
      id: 1,
      text: 'Context API 배우기',
      done: true,
    },
    {
      id: 2,
      text: 'TypeScript 배우기',
      done: true,
    },
    {
      id: 3,
      text: 'TypeScript 와 Context API 함께 사용하기',
      done: false,
    },
  ];
  const [todos, dispatch] = useReducer(todosReducer, initialState);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
}

/**
 * Custom Hook
 * 추후 TodosStateContext, TodosDispatchContext를 사용하게 될 때
 * 다음과 같이 useContext를 사용해서 Context의 값을 사용할 수 있다.
 * todos의 타입은 TodosState | undefined 일 수 있기때문에 체크해줘야한다.
 *  const todos = useContext(TodosStatusContext)
 *  if(!todo) throw Error("TodosStatusContext not found")
 * 이렇게 해도 상관없지만 전용 Hook을 만들어서 편리하게 사용하자.
 */
export function useTodosState(): TodosState {
  const state = useContext(TodosStateContext);
  if (!state) throw Error('TodosProvider not found');
  return state;
}

export function useTodosDispatch(): TodosDispatch {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw Error('TodosDispatch not found');
  return dispatch;
}
