import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './App.css';
import { MemoHello } from './components/Hello';
import { flushSync } from 'react-dom';

const Title = memo(({ hideTitle }: { hideTitle: () => void }) => {
  console.log('TTTTTTTT');
  return (
    <h3>
      Title
      <button onClick={hideTitle}>TTT</button>
    </h3>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Hong');
  const [name2, setName2] = useState('Name2');
  const [isShowTitle, setShowTitle] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);
  const tmpRef = useRef<string>('');

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      fileRef.current = e.target.files[0];
      console.log('::>>', fileRef.current);
      setName('image:' + fileRef.current.name);
    }
  };

  const changeX = () => {
    flushSync(() => setCount(count => count + 1));
    flushSync(() => setCount(count => count + 1));
    flushSync(() => setName(name => name + '.'));
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('name>>', nameRef.current?.value, tmpRef.current);
    const currName = nameRef.current?.value;
    tmpRef.current = currName + '!';
    setName(tmpRef.current);
  };

  const hideTitle = useCallback(() => setShowTitle(false), []);

  useEffect(() => {
    const intl = setInterval(() => {
      console.log('aaaaa');
      if (nameRef.current) nameRef.current.value = 'KIM';
      nameRef.current?.focus();
    }, 1000);

    return () => clearInterval(intl);
  }, [count]);

  return (
    <>
      {isShowTitle && <Title hideTitle={hideTitle} />}
      <button onClick={() => changeX()}>BBB {count}</button>
      <MemoHello name={name} count={count} changeName={changeName}>
        <p>AAA</p>
      </MemoHello>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <form id='frm' onSubmit={submit}>
          <input type='text' value={name} onChange={changeName} />
          <input
            type='text'
            value={name2}
            onChange={e => setName2(e.currentTarget.value)}
          />
          <input type='text' ref={nameRef} />
          <input
            type='file'
            ref={fileInputRef}
            onChange={changeFile}
            style={{ visibility: 'hidden' }}
          />
          <img
            src={fileRef.current?.webkitRelativePath}
            alt='aaa'
            style={{
              width: '200px',
              backgroundColor: 'black',
              cursor: 'pointer',
            }}
            onClick={() => fileInputRef.current?.click()}
          />
          <button type='submit'>Submit</button>
        </form>
        <span>{name2}</span>
      </div>
    </>
  );
}

export default App;
