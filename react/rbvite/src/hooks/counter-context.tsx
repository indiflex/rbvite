import { ReactNode, createContext, useContext, useState } from 'react';

type ContextProps = {
  count: number;
  plusCount: () => void;
};

export const CountContext = createContext<ContextProps>({
  count: 0,
  plusCount: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useCount = () => useContext(CountContext);

export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const plusCount = () => setCount(count => count + 1);

  return (
    <CountContext.Provider value={{ count, plusCount }}>
      {children}
    </CountContext.Provider>
  );
};
