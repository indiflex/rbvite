const arr = ['1', '2', '3'];

const ii = arr.map(a => parseInt(a));
const ii2 = arr.map(arg => parseInt(arg));

console.log('🚀  ii:', ii);
console.log('🚀  ii2:', ii2);

const fx = (x, y, z) => console.log('fx>>', x, y, z);
arr.map((a, i, arr2) => fx(a, i, arr2));
arr.map(fx);

const unary = fn => (fn.length === 1 ? fn : arg => fn(arg));
const ii3 = arr.map(unary(parseInt));
console.log('🚀  ii3:', ii3);

const fxy = (x, y) => x + y;
console.log('fxy1>>', arr.map(fxy));
console.log('fxy1>>', arr.map(fxy));
const fitArgs =
  fn =>
  (...args) =>
    fn([...args].slice(0, fn.length));
