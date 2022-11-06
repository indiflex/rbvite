// import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useSession } from '../hooks/session-context';

export const Login = () => {
  console.log('@@@ Login');
  const { login } = useSession();
  // const [userId, setUserId] = useState(0);
  // const [userName, setUserName] = useState('일동');
  const userIdRef = useRef();
  const userNameRef = useRef();

  const submit = (evt) => {
    evt.preventDefault();
    login(userIdRef.current.value, userNameRef.current.value);
  };

  useEffect(() => {
    userIdRef.current.value = '10';
    userNameRef.current.value = '길동';
    userIdRef.current.focus();
  }, []);

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <label htmlFor='user-id'>
          UserID:
          <input id='user-id' type='number' ref={userIdRef} />
        </label>
        <label htmlFor='user-name'>
          UserName:
          <input id='user-name' type='text' ref={userNameRef} />
        </label>
        <button type='submit'>LogIn</button>
      </form>
    </>
  );
};
