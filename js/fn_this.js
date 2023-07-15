// 'use strict';

const hong = {id: 1, name: 'Hong', x: 'hongX'};
const kim = {id: 2, name: 'Kim'};

x = 9;
this.y = 8;
const expressFn = function(name) {
  // if, 'use strict'?
  this.name = name;
  // console.log(this, new.target, this.name, name, this.x);
  console.log(new.target, this.name, globalThis.name, this.x);
}
// console.log('global.this.x>>>', this)


const arrowFn = (name) => {
  this.name = name;
  console.log(this, new.target, this.name, name);
}

expressFn('expfn');
// expressFn.bind(hong)('bind!!');
expressFn.call(hong, 'bind!!');
expressFn.apply(hong, ['bind!!']);
// arrowFn('afn');

// const dfn = new expressFn('D');
// const afn = arrowFn('A'); // error!

return;

const Dog = function(name) {
  console.log(new.target, 
              this instanceof Dog);
  this.name = name;
  this.bark = function () {
  console.log('bark=', new.target, this.name, name);
  };
  this.bark2 = () =>
    console.log('bark2=', new.target, this.name, name);
}

const dog = Dog('Doggy');
const lucy = new Dog('Lucy');
// Dog.bark(); // ?
lucy.bark(); // ?
lucy.bark2(); // ?
console.log('type=', typeof dog); // ?
console.log('type=', typeof lucy); // ?
