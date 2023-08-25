import t from './t.json';
// import { value } from './aa';
// console.log('🚀  t:', t, value);

// export const x = 2;
const x = 2;
let a: string | number;
a = x;
let b = 'abc';
a = b;
// b.replac;

function f1(cb: (s: string) => boolean, x: string) {
  cb(x);
}

const cbf = (s: string) => !!s.match(/hong/i);
f1(cbf, 'hong kildong');

const hong = { id: 1, name: 'Hong', addr: 'Seoul' };
type FullUser = {
  [k in keyof typeof hong]: (typeof hong)[k];
};
type User = Omit<FullUser, 'addr'>;
// type User = Omit<FullUser, 'addr'>;
type UU = Pick<FullUser, 'id' | 'name'>;

const xuser = hong as User;
const yuser = <User>hong;

export { User, xuser };

// const arr = [1, 2, 4, 3, 5];
// const arr2 = arr.toSorted((a: number, b: number) => a - b);
// console.log(arr2, arr);

console.log('------------- decorator -----------------');
type Deco = () => void;
// function history(target: any, key: string, descriptor: PropertyDescriptor) {
const history = (target: any, key: string, descriptor: PropertyDescriptor) => {
  console.log('history>>', descriptor.value);
  console.table({ class: target.constructor.name, method: key });

  const org = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    console.log('**********', key, args);
    org.call(this, ...args);
  };
};

class Sign {
  constructor(public system: string) {}

  @history
  login(id: string, pw: string) {
    console.log('login>>', id, pw, this.system);
  }

  @history
  logout(id: string) {
    console.log('logout>>', id, this.system);
  }
}

const signer = new Sign('TS');
signer.login('hong', 'password');
signer.logout('hong');
signer.login('kim', 'password');
