import { useReducer } from 'react';
import { useState } from 'react';
import './App.css';
import { Hello, Hello2 } from './components/Hello';
import { My } from './components/My';
import { SessionProvider } from './hooks/session-context';

// action: {type: 'plus' | 'minus', payload: value}
const reducer = (preCount, action) => {
  switch (action.type) {
    case 'plus':
      return preCount + action.payload;
    case 'minus':
      return preCount - 1;
  }
};

function App() {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);

  const plusCount = (x = 1) => {
    // flushSync(() => setCount((count) => count + 1));
    // flushSync(() => setCount((count) => count + 1));
    // setCount((count) => count + x);
    dispatch({ type: 'plus', payload: x });
  };

  const minusCount = () => {
    // setCount((count) => count - 1);
    dispatch({ type: 'minus' });
  };

  return (
    <div className='App'>
      <Hello name='시코' />
      <Hello2 id={10} name='시니어코딩' />
      <div className='card'>
        {/* <button onClick={() => setCount((count) => count + 1)}> */}
        <button onClick={() => plusCount()}>count is {count}</button>
        <button onClick={() => plusCount(100)}>PlusCount</button>
        <button onClick={minusCount}>MinusCount</button>
        {/* <My
            session={session}
            login={login}
            logout={logout}
            removeCartItem={removeCartItem}
          /> */}
        <SessionProvider>
          <My />
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;
