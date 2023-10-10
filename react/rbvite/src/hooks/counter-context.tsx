import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type CountContextProp = {
  count: number;
  plusCount: () => void;
  setCount: Dispatch<SetStateAction<number>>;
};

const CounterContext = createContext<CountContextProp>({
  count: 0,
  plusCount: () => {},
  setCount: () => {},
});

type ProviderProp = {
  children: ReactNode;
};
export const CounterProvider = ({ children }: ProviderProp) => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider
      value={{ count, setCount, plusCount: () => setCount(c => c + 1) }}
    >
      {children}
    </CounterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => useContext(CounterContext);
