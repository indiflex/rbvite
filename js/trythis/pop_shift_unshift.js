const arr = [1, 2, 3, 4];

const push = (arr, ...appendValues) => {};
const pop = (arr, cnt) => {};
const unshift = (arr, ...appendValues) => {};
const shift = (arr, cnt) => {};

console.log(push(arr, 5, 6)); // [1, 2, 3, 4, 5, 6]
console.log(pop(arr)); // [1, 2, 3]
console.log(pop(arr, 2)); // 2개 팝! ⇒ [1, 2]
console.log(unshift(arr, 0)); // [0, 1, 2, 3, 4]
console.log(unshift(arr, 7, 8)); // [7, 8, 1, 2, 3, 4]
console.log(shift(arr)); // [2, 3, 4]
console.log(shift(arr, 2)); // [3, 4]

console.log(arr); // [1, 2, 3, 4]
