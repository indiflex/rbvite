// O(n^2)
const keyPairOn = (arr, n) => {
  let ret;
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      if (arr[i] + arr[j] === n) {
        ret = [i, j];
        break;
      }
    }
    if (ret) break;
  }
  return ret;
};

/*
 keyPair O(logN) version
 ex) keyPair([1, 3, 4, 5], 7)
 i         0      1      2
 val       1      3      4
 pairIdx {7-1:0, 7-3:1, 
 i === 4 일 때, pairIdx 두번째(4:1)을 찾아서 바로 [1, i] 반환!
*/
const keyPair = (arr, n) => {
  const pairIdx = {}; // {val:idx} : val의 값은 idx와 짝이야!
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (pairIdx[val]) return [pairIdx[val], i];
    pairIdx[n - val] = i;
  }
};

//  idx  0  1  2  3  4
//pairIdx {6:0, 5:1, 4:2, ..}
const kp1 = keyPair([1, 2, 3, 4, 5], 7); // [2, 3]
console.log('🚀  kp1:', kp1);
const kp2 = keyPair([1, 2, 3, 4, 5], 9); // [3, 4]
console.log('🚀  kp2:', kp2);

const kp3 = keyPair([1, 4, 45, 6, 10, 8], 16); // [3, 4]
console.log('🚀  kp3:', kp3);
const kp4 = keyPair([1, 2, 4, 3, 6], 10); // [2, 4]
console.log('🚀  kp4:', kp4);
