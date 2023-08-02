const LINE2 = [
  '신도림',
  '성수',
  '신설동',
  '용두',
  '신답',
  '용답',
  '시청',
  '충정로',
  '아현',
  '이대',
  '신촌',
  '공항철도',
  '홍대입구',
  '합정',
  '당산',
  '영등포구청',
  '문래',
  '대림',
  '구로디지털단지',
  '신대방',
  '신림',
  '봉천',
  '서울대입구',
  '낙성대',
  '사당',
  '방배',
  '서초',
  '교대',
  '강남',
  '역삼',
  '선릉',
  '삼성',
  '종합운동장',
  '신천',
  '잠실',
  '잠실나루',
  '강변',
  '구의',
  '건대입구',
  '뚝섬',
  '한양대',
  '왕십리',
  '상왕십리',
  '신당',
  '동대문역사문화공원',
  '을지로4가',
  '을지로3가',
  '을지로입구',
];

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
