function memoized(fn) {
  const lookupTable = {};
  return function (k) {
    // return lookupTable[k] || (lookupTable[k] = fn(k));

    if (lookupTable[k]) return lookupTable[k];

    lookupTable[k] = fn(k);
    console.log(k, 'LT>>', lookupTable);
    return lookupTable[k];
  };
}

// let runCnt = 0;
// function factorial(n) {
//   runCnt++;
//   if (n === 0) return 1;
//   return n * factorial(n - 1);
// }

// console.log(factorial(3));
// console.log(factorial(5));
// console.log(`runCnt11=${runCnt}`);

const memoizedFactorial = memoized(function (n) {
  memoizedFactorialRunCnt++;
  if (n === 0) return 1;
  return n * memoizedFactorial(n - 1);
});

let memoizedFactorialRunCnt = 0;
console.log(memoizedFactorial(3));
console.log(memoizedFactorial(5));
console.log(memoizedFactorial(6));
console.log(`runCnt=${memoizedFactorialRunCnt}`);
