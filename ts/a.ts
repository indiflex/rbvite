// export const x = 1;
const x = 1;

import { User, xuser } from './mods/b';
let y: User = { id: 1, name: 'x' };
console.log('🚀  y:', y, xuser.id);

const hong = { id: 3, name: 'lk' };
let z = hong as User;
let zz = <User>hong;

type Emp<T = unknown> = {
  [k in keyof T]: T[k];
};
