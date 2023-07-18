const myArray = [1, 4, 9];
const powSqrtByForOf = arr => {
  const p = [];
  const q = [];
  for (const a of arr) {
    p.push(a ** 2);
    q.push(Math.sqrt(a));
  }
  return [p, q];
};

const powSqrtByMap = arr => [arr.map(a => a ** 2), arr.map(a => Math.sqrt(a))];

console.log(powSqrtByForOf(myArray)); // [[1, 16, 81], [1, 2, 3]]
// console.log(powSqrtByForEach(myArray)); // [[1, 16, 81], [1, 2, 3]]
console.log(powSqrtByMap(myArray)); // [[1, 16, 81], [1, 2, 3]]
