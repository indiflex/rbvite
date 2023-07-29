const A = [1, 2, 3, 4, 5, 3];
const B = [1, 22, 3, 44, 5];
const C = [11, 222, 3, 4, 555];
const intersect2 = (arr1, arr2) => {
  const set = new Set(arr1);
  for (const t of set) {
    if (!arr2.includes(t)) {
      set.delete(t);
    }
  }
  return [...set];
};
const intersect3 = (arr1, arr2) => {
  const set = new Set();
  const [smArr, bigArr] =
    arr1.length > arr2.length ? [arr2, arr1] : [arr1, arr2];
  for (const t of bigArr) {
    if (smArr.includes(t)) {
      set.add(t);
    }
  }
  return [...set];
};
const intersect4 = (arr1, arr2) => [
  ...new Set(arr1.filter(a => arr2.includes(a))),
];
const intersect = (arr1, arr2) => [
  ...arr1.reduce((acc, a) => (arr2.includes(a) ? acc.add(a) : acc), new Set()),
];

const i1 = intersect(A, B); // 1, 3, 5
console.log('🚀  i1:', i1);
const i2 = intersect(A, C); // 3, 4
console.log('🚀  i2:', i2);

const diff = (arr1, arr2) => [
  ...arr1.reduce((acc, a) => (!arr2.includes(a) ? acc.add(a) : acc), new Set()),
];
const d1 = diff(A, B); // 2, 4
const d2 = diff(B, A); // 22, 44
const d3 = diff(A, C); // 1, 2, 5
const d4 = diff(B, C); // 1, 22, 44, 5
console.log(d1, d2, d3, d4);

const union = (arr1, arr2) => [...new Set([...arr1, ...arr2])];
const u1 = union(A, B); // 1, 2, 3, 4, 5, 22, 44
const u2 = union(A, C); // 1, 2, 3, 4, 5, 11, 222, 555
console.log(u1, u2);
