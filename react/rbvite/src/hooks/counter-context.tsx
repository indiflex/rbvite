import { ReactNode, createContext, useContext, useReducer } from 'react';

type CountContextProp = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
  jumpCount: (alpha: number) => void;
  // setCount: Dispatch<SetStateAction<number>>;
  setCount: (_count: number) => void;
};

const CounterContext = createContext<CountContextProp>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
  jumpCount: () => {},
  setCount: () => {},
});

type ProviderProp = {
  children: ReactNode;
};

type Action = {
  actionType: 'PLUS' | 'MINUS' | 'SET';
  payload?: number;
};

const reducer = (count: number, action: Action) => {
  const { actionType, payload = 1 } = action;
  switch (actionType) {
    case 'PLUS':
      return count + payload;
    case 'MINUS':
      return count - payload;
    case 'SET':
      return payload;
    default:
      return count;
  }
};

export const CounterProvider = ({ children }: ProviderProp) => {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);

  const plusCount = () => dispatch({ actionType: 'PLUS' }); // reducer(count, 'PLUS')
  const minusCount = () => dispatch({ actionType: 'MINUS' });
  const jumpCount = (alpha: number) =>
    dispatch({ actionType: 'PLUS', payload: alpha });
  const setCount = (_count: number) =>
    dispatch({ actionType: 'SET', payload: _count });

  return (
    <CounterContext.Provider
      value={{ count, setCount, plusCount, minusCount, jumpCount }}
    >
      {children}
    </CounterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => useContext(CounterContext);
