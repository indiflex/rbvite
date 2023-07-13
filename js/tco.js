function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

function factorialTCO(n, acc = 1) {
  if (n === 0) return acc;
  return factorialTCO(n - 1, n * acc);
}

// for (let i = 0; i <= 10; i++) {
//   console.log(i, factorial(i));
// }
// console.log('---------------');
// for (let i = 0; i <= 10; i++) {
//   console.log(i, factorialTCO(i));
// }

function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 2) + fibonacci(n - 1);
}

const fibonacciTCO = (n, pp = 0, p = 1) =>
  n === 0 ? pp : fibonacciTCO(n - 1, p, pp + p);

for (let i = 0; i <= 10; i++) {
  console.log(i, fibonacci(i));
}
console.log('---------------');
for (let i = 0; i <= 10; i++) {
  console.log(i, fibonacciTCO(i));
}
