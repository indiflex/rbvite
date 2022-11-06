import { useEffect } from 'react';
import { useState } from 'react';
import { useSession } from '../hooks/session-context';
import { Login } from './Login';
import { Profile } from './Profile';

export const My = () => {
  const { session, removeCartItem } = useSession();
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const intl = setInterval(() => {
      setSec((sec) => sec + 1);
    }, 1000);

    return () => clearInterval(intl);
  }, []);

  return (
    <>
      <h2>My {sec}</h2>
      {session.loginUser ? (
        // <Profile session={session} logout={logout} />
        <Profile />
      ) : (
        <Login />
      )}

      <ul>
        {session?.cart.map((item) => (
          <li key={item.id}>
            {item.name} ({item.price})
            <button onClick={() => removeCartItem(item.id)}>x</button>
          </li>
        ))}
      </ul>
    </>
  );
};
