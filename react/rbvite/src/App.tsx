import {
  ChangeEvent,
  FormEvent,
  RefObject,
  // ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './App.css';
import { MemoHello } from './components/Hello';
import { flushSync } from 'react-dom';
import { useCounter } from './hooks/counter-context';

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
  const { count, setCount } = useCounter();
  const [name, setName] = useState('Hong');
  const [name2, setName2] = useState('Name2');
  const [isShowTitle, setShowTitle] = useState(true);

  const imgId = useId();
  const nameInpuId = useId();

  const nameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);
  const imgTagRef = useRef<HTMLImageElement>(null);
  const imgViteRef = useRef<HTMLImageElement>(null);
  const tmpRef = useRef<string>('');

  const fileToImage = (file: File | null, ref: RefObject<HTMLImageElement>) => {
    if (!file) return;
    const freader = new FileReader();
    freader.readAsDataURL(file);

    freader.onload = () => {
      if (ref.current && freader.result)
        ref.current.src = freader.result.toString();
    };
  };

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      fileRef.current = e.target.files[0];
      console.log('::>>', fileRef.current);
      setName('image:' + fileRef.current.name);
      fileToImage(fileRef.current, imgTagRef);
    }
  };

  const changeX = () => {
    flushSync(() => setCount(count + 1));
    flushSync(() => setCount(count + 1));
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
  let tmpX: File | null = null;

  type ChildComponentProps = {
    parentMsg: string;
    // ref: ForwardedRef<ChildHandlerType>;
  };
  // const ChildComponent = forwardRef((_, ref) => {
  const ChildComponent = forwardRef(
    ({ parentMsg }: ChildComponentProps, ref) => {
      console.log('ChildComponent!!!');
      const [msg, setMsg] = useState(parentMsg);

      const handler = {
        showMessage(x: string) {
          setMsg(x + ' - ' + new Date());
        },
      };

      useImperativeHandle(ref, () => handler);

      return <>Child: {msg}</>;
    }
  );

  type ChildHandlerType = {
    showMessage: (s: string) => void;
  };
  const childRef = useRef<ChildHandlerType>(null);

  return (
    <>
      <ChildComponent parentMsg='pppp' ref={childRef} />
      <button onClick={() => childRef.current?.showMessage('xxx')}>
        showChildMessage
      </button>
      {isShowTitle && <Title hideTitle={hideTitle} />}
      <button onClick={() => changeX()}>BBB {count}</button>
      <MemoHello name={name} changeName={changeName}>
        <p>AAA</p>
      </MemoHello>
      <div className='card'>
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
        <form id='frm' onSubmit={submit}>
          <input type='text' value={name} onChange={changeName} />
          <input
            type='text'
            value={name2}
            onChange={e => setName2(e.currentTarget.value)}
          />
          <label htmlFor={nameInpuId}>
            Name:
            <input id={nameInpuId} type='text' ref={nameRef} />
          </label>
          <input
            type='file'
            ref={fileInputRef}
            onChange={changeFile}
            style={{ visibility: 'hidden' }}
          />
          <img
            src={fileRef.current?.webkitRelativePath}
            alt='aaa'
            id={imgId}
            ref={imgTagRef}
            draggable
            style={{
              width: '200px',
              backgroundColor: 'black',
              cursor: 'pointer',
            }}
            onDrop={e => {
              // e.preventDefault();
              const file = e.dataTransfer.files.item(0);
              console.log('drop>>', e.dataTransfer, file, tmpX);
              fileToImage(tmpX, imgTagRef);
            }}
            onDragOver={e => {
              e.preventDefault();
              // console.log('dragOver>>', e.dataTransfer.files.item(0));
              setName('Drop Here!');
              if (imgViteRef.current)
                imgViteRef.current.style.cursor = 'pointer';
            }}
            onClick={e => {
              console.log('trust>>>', e.isTrusted);
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          />
          <img
            ref={imgViteRef}
            draggable
            onDragStart={e => {
              console.log('dragStart>>>', e.dataTransfer.files.item(0));
              tmpX = e.dataTransfer.files.item(0);
            }}
            src='/vite.svg'
          />
          <button type='submit'>Submit</button>
        </form>
        <span>{name2}</span>
      </div>
    </>
  );
}

export default App;
