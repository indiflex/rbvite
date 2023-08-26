// console.clear();

function deco(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log('🚀  key:', key);
  console.log(target.constructor.name);
  console.log(descriptor);
  const orgFn = descriptor.value;
  descriptor.value = () => {
    console.log('decooooooooooooooooo');
    orgFn();
  };
}

function decofn(...args: unknown[]) {
  console.log('decofn>>>>>>', ...args);
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const orgFn = descriptor.value;
    descriptor.value = (...args: unknown[]) => {
      console.log('decooooooooooooooooo');
      orgFn(...args);
    };
  };
}

class TestClass {
  @decofn('x', 'y')
  testfn(n: number) {
    console.log('testfn!!', n);
  }
  @deco
  test() {
    console.log('test!!');
  }
}

new TestClass().testfn(2);

// const history = (target: any, key: string, descriptor: PropertyDescriptor) => {
//   console.log('history>>', descriptor);
//   console.table({ class: target.constructor.name, method: key });

//   const org = descriptor.value;
//   descriptor.value = function (...args: unknown[]) {
//     console.log('**********', key, args);
//     org.call(this, ...args);
//   };
// };

// type Fn = (...cbargs: unknown[]) => void;
// // const decoFn =
// //   (flag: string, cb: Fn, ...args: unknown[]) =>
// //   (target: any, key: string, descriptor: PropertyDescriptor) => {
// //     console.log('decoFn>>>', flag);
// //     cb(...args);
// //   };

// const decoFn =
//   (flag: string) =>
//   (target: any, key: string, descriptor: PropertyDescriptor) => {
//     console.log('decoFn>>>', key, flag);
//   };

// function first() {
//   const flag = 'first';
//   console.log(flag);
//   return decoFn(flag);
//   // return decoFn(
//   //   'first',
//   //   (...flag) => console.log('first.cb>>>', ...flag),
//   //   'x',
//   //   'y'
//   // );
//   // return function (target: any, key: string, descriptor: PropertyDescriptor) {
//   //   console.log('decoFn>>>', flag);
//   // };
// }

// function second() {
//   console.log('second!!');
//   return decoFn('second');
// }

// type ClassType = { new (...args: any[]): {} };

// function other<T extends ClassType>(c: T) {
//   return class extends c {
//     otherProp = 'xxx';
//   };
// }

// function hellox(lang: string) {
//   console.log('**charset:', lang);
//   return function (target: any, key: string): any {
//     let value = target[key];
//     function getter() {
//       console.log('&&&&&&&&&&&&&&', key);
//       return `${value} in ${lang}`;
//     }

//     function setter(newVal: string) {
//       value = `${newVal}~~`;
//     }

//     return {
//       get: getter,
//       set: setter,
//       // set: (newVal: string) => (value = `${newVal}~~`),
//       enumerable: true,
//       configurable: true,
//     };
//   };
// }

// function hello(target: any, propertyKey: string): any {
//   console.log('&&&&&&&&&&&&&&', propertyKey, target.constructor.name);
//   let value = target[propertyKey];
//   function getter() {
//     return `${value}!!`;
//   }

//   function setter(newVal: string) {
//     value = `${newVal}~~`;
//   }

//   return {
//     get: getter,
//     set: setter,
//     // set: (newVal: string) => (value = `${newVal}~~`),
//     enumerable: true,
//     configurable: true,
//   };
// }

// @other
// class C {
//   @hello
//   name: string;

//   constructor(name: string) {
//     console.log('CreateC------>>>', name);
//     this.name = name;
//   }

//   @history
//   hist() {
//     console.log('hist!!!!!!!!');
//   }

//   @first()
//   @second()
//   method() {
//     console.log('METHOD!!');
//   }

//   @first()
//   @second()
//   get fullName() {
//     console.log('GET-SYS!!');
//     return this.name;
//   }
// }

// const h = new C('Hong');
// // const descriptor = Object.getOwnPropertyDescriptors(C);
// // const descriptor = Object.getOwnPropertyDescriptors(h);
// // const descriptor = Reflect.isExtensible(h);
// // const descriptor = Object.getOwnPropertyDescriptors(h);
// // console.log('🚀  descriptor:', descriptor);
// // h.method();
// h.name = 'Kim';
// console.log('-------------------', h.name);
// if ('otherProp' in h) console.log('otherProp>>', h.otherProp);

// export {};
