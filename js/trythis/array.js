Array.prototype.mapBy = function (prop) {
  return this.map(a => a[prop]);
};

Array.prototype.filterBy = function (prop, val) {
  return this.filter(a => a[prop] === val);
};

Array.prototype.findBy = function (prop, val) {
  return this.find(a => a[prop] === val);
};

Array.prototype.objectAt = function (idx) {
  return this[idx];
};

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

Array.prototype.sortBy = function (prop, direction = 'asc') {
  const flag = direction === 'asc' ? 1 : -1;
  return [...this].sort((a, b) => (a[prop] > b[prop] ? 1 * flag : -1 * flag));
};

Array.prototype.uniqBy = function (prop) {
  // return [...new Set(this.map(a => a[prop]))];
  return [...this.reduce((acc, a) => acc.add(a[prop]), new Set())];
};

const hong = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 21, name: 'Park' };
const choi = { id: 11, name: 'Choi' };
const loon = { id: 3, name: 'Loon' };

const arr = [1, 2, 4, 11, 5];
console.log('first>>', arr.firstObject); // 1
console.log('last>>>', arr.lastObject); // 5
const arr2 = [...arr].sort((a, b) => a - b);
console.log(arr2, arr);

const users = [hong, kim, lee, park, choi, loon]; // {id:1, name: 'Hong'}, …
const mapById = users.mapBy('id'); // [1, 2, 3]
console.log('🚀  mapById:', mapById);
const mapByName = users.mapBy('name'); // ['Hong', 'Kim', 'Lee']
console.log('🚀  mapByName:', mapByName);
const filterById = users.filterBy('id', 2); // [{id: 2, name: 'Kim'}]
console.log('🚀  filterById:', filterById);
const findBy = users.findBy('name', 'Kim'); // {id: 2, name: 'Kim'}
console.log('🚀  findBy:', findBy);
const objectAt = users.objectAt(1); // {id: 2, name: 'Kim'}
console.log('🚀  objectAt:', objectAt);
const sortById = users.sortBy('id');
console.log('🚀  sortById:', sortById);
const sortByName = users.sortBy('name');
console.log('🚀  sortByName:', sortByName);

const sortByIdDesc = users.sortBy('id', 'desc');
console.log('🚀  sortByIdDesc:', sortByIdDesc);
const sortByNameDesc = users.sortBy('name', 'desc');
console.log('🚀  sortByNameDesc:', sortByNameDesc);

const uniqById = users.uniqBy('id');
console.log('🚀  uniqById:', uniqById);
