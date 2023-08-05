function fn() {
  console.log('exp.fn');
}
const PI = Math.PI;
let version = 1.23;

console.log('*****************', PI);

class User {}

// f
export default function (i) {
  console.log('exp.def()');
}

const modX = { a: 1, b: 2, obj: { c: 3 } };

// export default f
export { modX as mod, User, version, PI, fn };

// export { User as default };
