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
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    bark() {
        console.log('멍!멍!');
    }
}
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    bark() {
        console.log('야옹~');
    }
}
//# sourceMappingURL=dogcat.js.map