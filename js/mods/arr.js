Object.defineProperties(Array.prototype, {
  firstObject: {
    get: function () {
      return this[0];
    },
  },
  lastObject: {
    get: function () {
      return this[this.length - 1];
    },
  },
});

const ARR = [1, 2, 3];

const hong = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 21, name: 'Park' };
const choi = { id: 11, name: 'Choi' };
const loon = { id: 3, name: 'Loon' };
const USERS = [hong, kim, lee, park, choi, loon];

export { ARR, USERS };
