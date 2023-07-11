const user = {
  '': 1,
  ' ': 1, // 'id': 1, '0y': 2 모두 OK!
  123: 1, // user[123], user['123'] OK, but user.123 is SyntaxError!!
  12345n: 2, // user[12345], user[12345n], user['12345'] OK, but user['12345n'] is undefined!
  true: 1, // OK  user[true]  user.true
  id: 2,
  [`name`]: 'Hong', // But, `name`: 'Hong'은 SyntaxError: Unexpected template string!
  [Symbol()]: 'Hong', // OK But, Symbol(): 'Hong'은 SyntaxError: Unexpected token ':'
  [`${new Date()}`]: 365, // OK! 'Sun Jul …': 365
  'my-friends': ['Han', 'Kim'],
  getInfo: () => `${this.id}-${this.name}`, // OK! But, this is not user!
  getInfo() {
    return `${this.id}-${this.name}`;
  }, // OK! getInfo의 최종 <f.o>
};

console.table(user);
console.log('--------------');
console.log(user);
// user.age = 20;
Object.defineProperty(user, 'age', {
  value: 39,
  writable: false,
  enumerable: false,
});
console.log('aaaaaaaaaaaa>>', user.age);
age = 50;
console.log('--------------');
console.log(Object.keys(user));

// console.log('obj.getOwnPropSym>', Object.getOwnPropertySymbols(user));

console.log(Object.entries(user));

// for (const [k, v] of Object.entries(user)) {
// }
// for (const k of Object.keys(user)) {
//   user[k];
// }

// console.log(Object.getOwnPropertyDescriptor(user, 'id'));
// console.log(Object.getOwnPropertyDescriptors(user));

const arr = [];
arr.length = 5;
console.log(arr, arr.length);

// Object.freeze;
console.log('======================================');
const extend = function (target) {
  const sources = [].slice.call(arguments, 1);
  sources.forEach(source => {
    for (let prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
};

const o1 = { id: 1 };
const o2 = { idd: 10 };
// extend(o1, o2);
const oo = Object.assign({}, o1, o2);
console.log(oo);
console.log(o1);

console.log('======================================');

const u1 = Object.assign({}, user);
const u2 = { ...user };
const u3 = new Object(user);
const u4 = Object.create(user);
// const u4 = Object.create({}, { p: { value: 42 }, q: { value: 55 } });
console.log('u1=', u1);
console.log('u2=', u2);
console.log('u3=', u3);
console.log('u4=', u4);
console.log('u4.proto=', Object.getPrototypeOf(u4));
console.log('u4.id>>>', u4.id);
console.log('======================================');

const kim = { nid: 3, nm: 'Hong', addr: 'Pusan' };
// for (const k of Object.keys(kim)) {
for (const k in kim) {
  console.log('k=', k, kim[k]);
}

console.log('ppp>>', process.argv);
