// 주의!) node --experimental-json-modules subway.js
import localdata from '../localdata.json' assert { type: 'json' };
const { LINE2 } = localdata;

// const { LINE2 } = require('../localdata.json');
class Subway {
  rotateCnt = 0;
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.startIdx = LINE2.indexOf(start);
    this.currIdx = this.startIdx - 1;
  }

  getCurrentStation() {
    return LINE2[this.currIdx];
  }

  get isEnd() {
    return (
      (this.rotateCnt === 2 && this.currIdx === this.startIdx - 1) ||
      (this.end && LINE2[this.currIdx] === this.end)
    );
  }

  gotoNextStation() {
    this.currIdx += 1;
    if (this.currIdx >= LINE2.length) {
      this.rotateCnt += 1;
      this.currIdx = 0;
    }

    return LINE2[this.currIdx];
  }

  *[Symbol.iterator]() {
    while (true) {
      if (this.isEnd) {
        break;
      }

      yield this.gotoNextStation();
      // yield `${
      //   this.rotateCnt * LINE2.length + this.currIdx - this.startIdx + 2
      // } - ${this.gotoNextStation()}`;
    }
  }

  iterator() {
    return {
      next: () => {
        if (this.isEnd) return { done: true };
        const value = `${
          this.rotateCnt * LINE2.length + this.currIdx - this.startIdx + 2
        } - ${this.gotoNextStation()}`;
        return { value, done: false };
      },
    };
  }
}

// const routes = new Subway('신도림', '신림');
// const routes = new Subway('문래', '신림');
const routes = new Subway('문래');
console.log([...routes]); // [ '문래', '대림', '구로디지털단지', '신대방', '신림' ]

const it1 = routes[Symbol.iterator]();
console.log(it1.next()); // { value: '문래', done: false }
console.log(it1.next()); // { value: '신림', done: false }
console.log(it1.next()); // { value: undefined, done: true }
console.log(it1.next()); // { value: undefined, done: true }

const routes2 = new Subway('구로디지털단지', '성수'); // 32개 정거장
console.log([...routes]); // ['구로디지털단지', '신대방', ..., '성수']
const it2 = routes2[Symbol.iterator]();
while (true) {
  const x = it2.next();
  console.log(x);
  if (x.done) break;
}
const route3 = new Subway('문래', '합정'); // 46개 정거장
console.log('route3>>', [...route3]);
const route4 = new Subway('신도림', '을지로입구'); // 48개 정거장
console.log('route4>>', [...route4]);
