const hong = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };

const once = f => {
  let done = false;
  return (...args) =>
    done ? undefined : ((done = true), f.call(this, ...args));
};

const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);

console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
console.log(fn(2, 7)); // undefined
console.log(fn(3, 8)); // undefined

const printInfo = function (x) {
  console.log('Info11>>', x, this.id, this.name);
};
const fn11 = once(printInfo.bind(hong));
fn11(1);

// fn2.call(hong, 11);
