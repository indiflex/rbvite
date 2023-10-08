import { ChangeEvent, memo } from 'react';

type HelloProps = {
  name: string;
  count: number;
  children?: React.ReactNode;
  changeName: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Hello = ({ name, count, children, changeName }: HelloProps) => {
  console.log('Hello!!!!!!!', count);
  return (
    <h2 style={{ border: '1px solid black' }}>
      <div className='x'>
        Hello, {name}! ({count})
      </div>
      <input type='text' value={name} onChange={changeName} />
      {children}
    </h2>
  );
};
Hello.defaultProps = { name: 'Kim' };
// Hello.defaultProps = { name: 'Kim', children: <div>AAA</div> };

export const MemoHello = memo(
  Hello,
  (
    { count: preCount, name: preName },
    { count: currCount, name: currName }
  ) => {
    console.log('🚀  preCount:', preCount, currCount);

    return preCount === currCount && preName === currName;
  }
);

// export default Hello;
