let runCnt = 0;
function fibonacciRecursive(n) {
  runCnt += 1;
  if (n < 2) return n;
  return fibonacciRecursive(n - 2) + fibonacciRecursive(n - 1);
}

function fibonacciLoop(n) {
  const arr = [0, 1];
  for (let i = 2; i <= n; i += 1) {
    runCnt += 1;
    arr[i] = arr[i - 2] + arr[i - 1];
  }
  return arr[n];
}

function memoized(fn) {
  const memoizedTable = {};
  return function (k) {
    return memoizedTable[k] || (memoizedTable[k] = fn(k));
  };
}

const memoizedFibonacci = memoized(function (n) {
  runCnt += 1;
  if (n < 2) return n;
  return memoizedFibonacci(n - 2) + memoizedFibonacci(n - 1);
});

console.time('X');
for (let i = 0; i < 9000; i += 1) {
  runCnt = 0;
  // console.log(`${i}, ${fibonacci(i)}, ${runCnt}회`);
  // console.log(`${i}, ${memoizedFibonacci(i)}, ${runCnt}회`);
  // console.log(`${i}, ${fibonacciLoop(i)}, ${runCnt}회`);
  // fibonacciLoop(i);
  memoizedFibonacci(i);
}
// console.log(`${fibonacciRecursive(40)}, ${runCnt}회`);
// console.log(`${fibonacciLoop(40)}, ${runCnt}회`);
// console.log(`${memoizedFibonacci(40)}, ${runCnt}회`);
console.timeEnd('X');
