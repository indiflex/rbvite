"use strict";
class Animal {
    #name;
    constructor(name) {
        this.#name = name;
    }
    bark() { }
    getName() {
        return this.#name;
    }
}
class BaseAnimal extends Animal {
    ani;
    constructor(aniOrName) {
        if (typeof aniOrName === 'string') {
            super(aniOrName);
            this.ani = new Animal(aniOrName);
        }
        else {
            super(aniOrName.getName());
            this.ani = aniOrName;
        }
    }
    bark() {
        super.bark();
        this.ani.bark();
    }
}
class Dog extends BaseAnimal {
    bark() {
        super.bark();
        console.log('멍!멍!');
    }
}
class Cat extends BaseAnimal {
    bark() {
        super.bark();
        console.log('야옹~');
    }
}
const x = new Dog(new Cat('개냥이'));
x.bark();
class X {
    id;
    constructor(id) {
        this.id = id;
    }
    f() {
        console.log('f>>', this.id);
    }
}
const xx = new X(123);
console.log('------------------------');
const fns = {
    id: xx.id,
    f: xx.f,
    barkDog() {
        console.log('멍!멍!');
        return this;
    },
    barkCat() {
        console.log('야옹~');
        return this;
    },
};
fns.barkCat().barkDog().f();
//# sourceMappingURL=dogcat.js.map