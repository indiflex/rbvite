const assert = require('assert');

const arr = [1, 3, 4, 2, 5, 8, 6, 7, 9];

const rangeSum2 = (s = 0, e = arr.length - 1) => {
  let sum = 0;
  for (let i = s; i <= e; i++) {
    sum += arr[i];
  }
  // return sum;
  console.log(s, e, '=>', sum);
};

const rangeSum3 = (s = 0, e = arr.length - 1) =>
  arr.slice(s, e + 1).reduce((acc, a) => acc + a);

const rangeSum4 = (s = 0, e = arr.length - 1) =>
  arr.map((a, i) => (i < s || i > e ? 0 : a)).reduce((acc, a) => acc + a);

const rangeSum = (s = 0, e = arr.length - 1) =>
  arr.reduce((acc, a, i) => (i < s || i > e ? acc : acc + a), 0);

assert.strictEqual(rangeSum(2, 5), 19); // 19
assert.strictEqual(rangeSum(3, 5), 15); // 15
assert.strictEqual(rangeSum(1, 4), 14); // 14
// assert.strictEqual(rangeSum(0, 4); // 15
// assert.strictEqual(rangeSum(5, 8); // 30
// assert.strictEqual(rangeSum(6, 8); // 22
// assert.strictEqual(rangeSum(2, 8); // 41
// assert.strictEqual(rangeSum(4, 4); // 5
assert.strictEqual(rangeSum(5), 30); // 30
assert.strictEqual(rangeSum(2), 41); // 41
assert.strictEqual(rangeSum(), 45); // 45
