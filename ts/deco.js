"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const history = (target, key, descriptor) => {
    console.log('history>>', descriptor.value);
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
class C {
    name;
    constructor(name) {
        console.log('CreateC------>>>', name);
        this.name = name;
    }
    // @first()
    // @second()
    method() {
        console.log('METHOD!!');
    }
    // @first()
    // @second()
    get fullName() {
        console.log('GET-SYS!!');
        return this.name;
    }
}
// const h = new C('Hong');
// h.method();
console.log('-------------------');
//# sourceMappingURL=deco.js.map