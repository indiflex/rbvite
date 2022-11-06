/*
[1, 2, 3].reduce((pre, a) => pre + a, 0);

pre            a             pre + a
-------------------------------------
0              1              0 + 1
0 + 1          2              1 + 2
3              3              3 + 3
3 + 3 
*/

import { useReducer, useState } from 'react';

export const Hello = (props) => {
  console.log('@@@@ Hello');
  // const [isActive, setIsActive] = useState(false);
  const [isActive, toggle] = useReducer((pre) => !pre, false);

  return (
    <>
      <h2>Hello, {props.name}!!</h2>
      {/* <button onClick={() => setIsActive(false)}> */}
      <button onClick={toggle}>
        Toggle : {isActive ? 'Active' : 'NotActive'}
      </button>
    </>
  );
};

export const Hello2 = ({ id, name }) => {
  return <h2 style={{ fontWeight: '900' }}>Hi, {id && name ? name : ''}!!</h2>;
};

Hello.defaultProps = { name: '시니어코딩' };
