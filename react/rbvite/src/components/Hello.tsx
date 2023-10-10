import { ChangeEvent, memo } from 'react';
import { useCounter } from '../hooks/counter-context';

type HelloProps = {
  name: string;
  children?: React.ReactNode;
  changeName: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Hello = ({ name, children, changeName }: HelloProps) => {
  const { count, setCount } = useCounter();
  console.log('Hello!!!!!!!', count);
  return (
    <h2 style={{ border: '1px solid black' }}>
      <div className='x'>
        Hello, {name}!({count})
      </div>
      <input type='text' value={name} onChange={changeName} />
      {children}
      <button onClick={() => setCount(c => c + 1)}>PlusCount</button>
    </h2>
  );
};
Hello.defaultProps = { name: 'Kim' };
// Hello.defaultProps = { name: 'Kim', children: <div>AAA</div> };

export const MemoHello = memo(
  Hello,
  ({ name: preName }, { name: currName }) => {
    return preName === currName;
  }
);

// export default Hello;
