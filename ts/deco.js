"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const history = (target, key, descriptor) => {
    console.log('history>>', descriptor);
    console.table({ class: target.constructor.name, method: key });
    const org = descriptor.value;
    descriptor.value = function (...args) {
        console.log('**********', key, args);
        org.call(this, ...args);
    };
};
// const decoFn =
//   (flag: string, cb: Fn, ...args: unknown[]) =>
//   (target: any, key: string, descriptor: PropertyDescriptor) => {
//     console.log('decoFn>>>', flag);
//     cb(...args);
//   };
const decoFn = (flag) => (target, key, descriptor) => {
    console.log('decoFn>>>', key, flag);
};
function first() {
    const flag = 'first';
    console.log(flag);
    return decoFn(flag);
    // return decoFn(
    //   'first',
    //   (...flag) => console.log('first.cb>>>', ...flag),
    //   'x',
    //   'y'
    // );
    // return function (target: any, key: string, descriptor: PropertyDescriptor) {
    //   console.log('decoFn>>>', flag);
    // };
}
function second() {
    console.log('second!!');
    return decoFn('second');
}
function other(c) {
    return class extends c {
        otherProp = 'xxx';
    };
}
function hellox(lang) {
    console.log('**charset:', lang);
    return function (target, key) {
        let value = target[key];
        function getter() {
            console.log('&&&&&&&&&&&&&&', key);
            return `${value} in ${lang}`;
        }
        function setter(newVal) {
            value = `${newVal}~~`;
        }
        return {
            get: getter,
            set: setter,
            // set: (newVal: string) => (value = `${newVal}~~`),
            enumerable: true,
            configurable: true,
        };
    };
}
function hello(target, propertyKey) {
    console.log('&&&&&&&&&&&&&&', propertyKey, target.constructor.name);
    let value = target[propertyKey];
    function getter() {
        return `${value}!!`;
    }
    function setter(newVal) {
        value = `${newVal}~~`;
    }
    return {
        get: getter,
        set: setter,
        // set: (newVal: string) => (value = `${newVal}~~`),
        enumerable: true,
        configurable: true,
    };
}
let C = class C {
    name;
    constructor(name) {
        console.log('CreateC------>>>', name);
        this.name = name;
    }
    hist() {
        console.log('hist!!!!!!!!');
    }
    method() {
        console.log('METHOD!!');
    }
    get fullName() {
        console.log('GET-SYS!!');
        return this.name;
    }
};
__decorate([
    hello
], C.prototype, "name", void 0);
__decorate([
    history
], C.prototype, "hist", null);
__decorate([
    first(),
    second()
], C.prototype, "method", null);
__decorate([
    first(),
    second()
], C.prototype, "fullName", null);
C = __decorate([
    other
], C);
const h = new C('Hong');
// const descriptor = Object.getOwnPropertyDescriptors(C);
// const descriptor = Object.getOwnPropertyDescriptors(h);
// const descriptor = Reflect.isExtensible(h);
// const descriptor = Object.getOwnPropertyDescriptors(h);
// console.log('🚀  descriptor:', descriptor);
// h.method();
h.name = 'Kim';
console.log('-------------------', h.name);
if ('otherProp' in h)
    console.log('otherProp>>', h.otherProp);
//# sourceMappingURL=deco.js.map