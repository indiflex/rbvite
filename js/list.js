const print = o => console.log(JSON.stringify(o, null, '  '));

const list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: undefined,
    },
  },
};

// for(;;)
const arr = [];
let node = list;
while (true) {
  console.log('value>>', node.value);
  arr.push(node.value);
  node = node?.rest;
  if (!node) break;
}
console.log('🚀  arr:', arr);

// array to list (뒤 -> 앞)
let node2;
for (let i = arr.length - 1; i >= 0; i -= 1) {
  console.log('node2>>', node2);
  node2 = { value: arr[i], rest: node2 };
  console.log('node22>>', node2);
  // if (i === arr.length - 2) break;
}
console.log('🚀  node2>>>>>\n', node2);
// print(node2);

// array to list (순방향)
let obj;
let preNode; // {value:1, rest: {value:2, rest:{value:3, rest:undefined}}}
for (let i = 0; i < arr.length; i++) {
  const node = { value: arr[i], rest: undefined };
  if (!obj) {
    obj = node; // {value:1, rest: null}
  } else {
    preNode.rest = node;
  }
  preNode = node;
}
console.log('🚀  node3>>>>>\n', obj);
return;

// 1과 2 사이에 4 끼워넣기!
const node1 = list;
console.log('🚀  node1:', node1.value);
const node4 = { value: 4, rest: node1.rest };
node1.rest = node4;

console.log(JSON.stringify(list, null, '    '));
// console.log('🚀  node2:', node2?.value);
// const node3 = node2.rest;
// console.log('🚀  node3:', node3?.value);
// const node4 = node3.rest;
// console.log('🚀  node4:', node4?.value);
// const node5 = node4.rest;
// console.log('🚀  node5:', node5.value);
