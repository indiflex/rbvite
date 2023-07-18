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

Dog.prototype.xx = 100;
const lucy = new Dog('Lucy', 3);
console.log('lucy.prototpye>>', lucy.__proto__);
console.log('lucy>>', lucy);
// console.log(typeof Animal, typeof lucy, lucy.getDogInfo());
lucy.proto();

console.log(':>>', Animal.ID, Dog.ID);

const ap = Object.create(lucy);
console.log('ap>>', ap);
console.log('ap.proto>>', Object.getPrototypeOf(lucy));
