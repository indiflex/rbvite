// var a = 1;
// global.b = 2;

// console.log(Object.getOwnPropertyDescriptor(global, 'a'));
// const c = delete a;
// const d = delete global.b;
// console.log(a, global.b, c, d);
// return;
class Animal {
  #name;
  static ID = 1;
  // extends Object 생략  {name: name}
  constructor(name) {
    this.#name = name || super.name;
  }

  static isDog(ani) {
    return ani.name === 'Dog';
  }

  getName() {
    return this.#name;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  toString() {
    return `Dog::${this.#name}`;
  }
}

const dog = new Animal('Dog');
console.log('🚀  dog:', dog);
console.log('🚀  Animal:proto', Object.getPrototypeOf(Animal));
console.log('🚀  dog:proto', Object.getPrototypeOf(dog));

// Animal.prototype.getName = function () {
//   return this.name;
// };
dog.name = 'Doggy';
console.log('🚀  dog:getName>>', dog.getName(), dog.name);
// console.log('🚀  dog:proto', Object.getPrototypeOf(dog));

// console.log('🚀  Animal:ID>>', Animal.ID);
// console.log('🚀  dog:ID>>', dog.ID);
console.log('🚀  dog:tostring>>', dog.toString());

Animal.prototype.toUpperName = function () {
  return this.name.toUpperCase();
};

console.log('toUpper>>', dog.toUpperName(), dog.toUpper);

Object.defineProperties(Animal.prototype, {
  upperName: {
    get: function () {
      return this.name.toUpperCase();
    },
  },
});
console.log('🚀  dog:upper>>', dog.upperName, dog.toUpperName());
