const assert = require('assert');

const r1 = [1, 2, 3].reduce((a, b) => a + b, 0); // 6
console.log('🚀  r1:', r1);
assert.strictEqual(r1, 6);

const reduce = (arr, fn, initValue) => {
  let i = 0;
  let acc = initValue ?? ((i += 1), arr[0]);
  for (; i < arr.length; i++) {
    acc = fn(acc, arr[i]);
  }
  return acc;
};

const r2 = reduce([1, 2, 3], (a, b) => a + b, 0); // 6이면 통과!
assert.strictEqual(
  reduce([1, 2, 3, 4, 5], (a, b) => a + b),
  15
); // 15면 통과!

assert.strictEqual(
  reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1),
  120
); // 120이면 통과!
assert.strictEqual(
  reduce([2, 2, 2], (a, b) => a * b),
  8
); // 8이면 통과!
assert.strictEqual(
  reduce([3, 3, 3], (a, b) => a * b, 0),
  0
); // 0이면 통과!
