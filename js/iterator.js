class Animal {
  name;
  static ID = 1; // <f.o>

  constructor(name) {
    this.name = name;
    console.log('Animal.xx>>>', this.xx, Animal.prototype.xx);
  }

  static isDog(ani) {
    return ani.name === 'Dog';
  }
}

class Dog extends Animal {
  age;
  constructor(name, age) {
    super(name);
    this.age = age;
    Animal.ID = 2;
  }

  proto() {
    console.log('proto>>', this.xx, Dog.prototype.xx);
  }

  getDogInfo() {
    return `This dog is ${this.name}, ${this.age} years old.`;
  }
}

class ItDog extends Dog {
  [Symbol.iterator]() {
    console.log('xxxxxxx');
    return this.name.split(', ').values();
  }
}
// const idog = new ItDog('Toby, Max, Sam');
// console.log('11>>', [...idog]);
// for (const d of idog) console.log(d);

class ItDog2 extends Dog {
  [Symbol.iterator]() {
    let idx = 0;
    const names = this.name.split(/, /);
    return {
      next() {
        console.log('NEXT>>', idx);
        return { value: names[idx++], done: idx > names.length };
      },
    };
  }
}
const idog2 = new ItDog2('Toby, Max, Sam');
for (const d of [...idog2]) {
  console.log(d);
  if (d === 'Max') break;
}
// const iter = idog2[Symbol.iterator]();
// console.log(iter.next()); // 4회 반복

console.log('---------------------------');

class Q {
  #arr;
  constructor(arr) {
    this.#arr = arr;
  }

  [Symbol.iterator] = () => {
    let idx = 0;
    return {
      next: () => {
        return { value: this.#arr[idx++], done: idx > this.#arr.length };
      },
    };
  };
}

const q = new Q([1, 2, 3]);
// for (const a of q) {
//   console.log('🚀  a:', a);
// }
const x = q[Symbol.iterator]();