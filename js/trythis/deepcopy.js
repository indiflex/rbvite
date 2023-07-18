const assert = require('assert');

const arr = [1, 2, 3];
const hong = { id: 1, name: 'Hong' };
class Dog {
  constructor(name) {
    this.name = name;
  }
}
const lucy = new Dog('Lucy');
const kim = {
  nid: 3,
  addr: 'Pusan',
  arr: [1, 2, 3, { aid: 1 }, [10, 20]],
  oo: { id: 1, name: 'Hong', addr: { city: 'Seoul' } },
  xx: null,
  yy: function () {
    console.log('yy>>', this.oo);
  },
  yyy() {
    console.log('yyy>>', this.addr);
  },
  [Symbol()]: 9,
  [Symbol()]: Symbol('symbol2'),
  zs: new Set([arr, hong]),
  zws: new WeakSet([arr, hong]),
  zm: new Map([[hong, arr]]),
  zwm: new WeakMap([[hong, arr]]),
  dog: lucy,
};

const deepCopy = obj => {
  if (
    obj === null ||
    typeof obj !== 'object' ||
    obj instanceof WeakSet ||
    obj instanceof WeakMap
  )
    return obj;

  const copiedObj = new obj.constructor();
  if (obj instanceof Set) {
    [...obj.keys()].forEach(_k => copiedObj.add(deepCopy(_k)));
    return copiedObj;
  } else if (obj instanceof Map) {
    [...obj.entries()].forEach(([_k, _v]) =>
      copiedObj.set(deepCopy(_k), deepCopy(_v))
    );
    return copiedObj;
  }

  // const copiedObj = Array.isArray(obj) ? [] : {};
  for (const k of Reflect.ownKeys(obj)) {
    copiedObj[k] = deepCopy(obj[k]);
  }

  return copiedObj;
};

const newKim = deepCopy(kim);
// console.log(kim.zm);
// console.log('--------------');
//  = 2;
// for (const mk of newKim.zm.keys()) mk.id = 100;
const zmKeys = newKim.zm.keys();
// Array.from(zmKeys)[0].id = 200;
zmKeys.next().value['id'] = 300;
console.log('::>>', typeof zmKeys, zmKeys.next());
for (const sk of newKim.zs.keys()) {
  console.log('ssss>>', sk);
  if ('id' in sk) sk.id = 1000;
  else sk[0] = 2000;
  // sk = 100;
}
// console.log(newKim.zm);
newKim.addr = 'Daegu';
newKim.oo.name = 'Kim';
assert.notDeepStrictEqual(newKim, kim, 'Not Valid Deep Copy!');
newKim.arr[0] = 100;
newKim.arr[3].aid = 200;
newKim.arr[4][1] = 300;
newKim.oo.addr.city = 'Daejeon';
console.log(
  'Pass1?',
  kim.arr[0] !== newKim.arr[0] && kim.arr[3].aid !== newKim.arr[3].aid
);
assert.notStrictEqual(kim.arr[4][1], newKim.arr[4][1], 'pass2: 다르지 않아요!');
assert.notStrictEqual(
  kim.oo.addr.city,
  newKim.oo.addr.city,
  'Not Pass3: city가 다르지 않아요!'
);

console.log(kim);
console.log('---------------');
console.log(newKim);
console.log('---------------');
kim.yy();
newKim.yy();
kim.yyy();
newKim.yyy();
