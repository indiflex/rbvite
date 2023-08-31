// import './Prototype';

// console.clear();

function Enumerable(enumerable: boolean) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = enumerable;
  };
}

function parseClass<T extends { new (...args: any[]): {} }>(cls: T) {
  return class extends cls {
    [x: string]: any;
    xxx = cls.constructor.name;
    callLog(method: string, ...args: unknown[]) {
      // log.call(this, ...args);
      this[method](...args);
    }
  };
}
@parseClass
class BaseService {
  constructor(private readonly svcA: ServiceA) {}

  @Enumerable(true)
  doSomething() {
    this.svcA.hello();
  }

  private log(id: number, name: string) {
    console.log(id, '- private-log -', name);
  }
}

function gen<T extends { new (...args: any[]): {} }>(c: T) {
  return class extends c {
    [x: string]: any;
    callLog(method: string, ...args: unknown[]) {
      // log.call(this, ...args);
      this[method](...args);
    }
  };
}

class ServiceA {
  hello() {
    console.log('hello in A');
  }
}
const bs = new BaseService(new ServiceA());
const BS = gen(BaseService);
const bs2 = new BS(new ServiceA());
console.log('bs2>>', bs2);
console.log('ㅠㅠ', Object.getOwnPropertyDescriptors(bs2));
console.log('xxx>>', Object.getOwnPropertyDescriptors(BS));
console.log('yyy>>', Object.getOwnPropertyDescriptors(BaseService));
for (const k in bs) console.log('k1>>', k);
for (const k in bs2) console.log('k2>>', k);
bs2.callLog('log', 10, 'Kim');

// class ServiceB extends BaseService {
//   constructor(private readonly svcA: ServiceA) {
//     super(svcA);
//   }
//   hello() {
//     this.doSomething();
//   }
// }

// const sA = new ServiceA();
// const sB = new ServiceB(sA);
// sB.doSomething();

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

function clsDeco<T extends { new (...args: any[]): {} }>(cls: T) {
  console.log('class-deco!!');
  return class extends cls {
    otherProp = 'xxx';
  };
}

function autoincrement(start: string) {
  return function (target: any, propertyKey: string): any {
    let val = target[propertyKey] || start;
    console.log('🚀  val:', val);

    function getter() {
      return `GET ${val}`;
    }

    function setter(val: string) {
      val = val;
    }

    return {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    };
  };
}

function Validate(target: any, key: string, descriptor: PropertyDescriptor) {
  const orgFn = descriptor.value;
  console.log('🚀  Validate.orgFn:', orgFn, Object.keys(target.validators));
  descriptor.value = function (...args: any[]) {
    Object.keys(target.validators).forEach(k => {
      if (!target.validators[k](args)) throw new Error('Not Valid');
    });
    orgFn.apply(this, args);
  };
}

function MinLength(len: number) {
  console.log('MinLength!!!!!', len);
  return function (target: any, key: string, pidx: number) {
    console.log('target.validators>>', target.validators);
    target.validators = target.validators ?? {};
    target.validators['minLength'] = function (args: string[]) {
      return args[pidx].length >= len;
    };
  };
}

function MaxLength(len: number) {
  console.log('MaxLength!!!!!', len);
  return function (target: any, key: string, pidx: number) {
    console.log('target.validators>>', target.validators);
    target.validators = target.validators || {};
    target.validators['maxLength'] = function (args: string[]) {
      console.log('max>>', args[pidx].length, len);
      return args[pidx].length <= len;
    };
  };
}

@clsDeco
class TestClass {
  @autoincrement('10')
  id: string = '';

  @Validate
  hello(@MinLength(3) name: string, @MaxLength(5) addr: string) {
    console.log(`Hello, ${name} in ${addr}!!`);
  }

  @decofn('x', 'y')
  testfn(n: number) {
    console.log('testfn!!', n);
  }
  @deco
  test() {
    console.log('test!!');
  }
}

const c = new TestClass();
console.log('🚀  c:', c, ', id=', c.id);
c.id = 'xxxx';
console.log('🚀  id:', c.id);
c.testfn(2);
c.hello('홍길동', '서울특별시');

// console.log(Reflect.getMetadata(c));

const passport = {
  id: 'passport',
  Strategy() {
    console.log('passport.Strategy>>', this.id);
    Strategy.prototype.authenticate(this.id);
  },
};

function Strategy() {
  passport.Strategy();
}

Strategy.prototype.authenticate = function (id: string) {
  console.log('Strategy.authenticate>>>', id);
};
// Strategy.prototype.authenticate('xx');

Strategy();

class employee {
  id: number;
  name: string;
  email: string | undefined;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
var emp = new employee(123, 'Smith');
employee.prototype.email = 'smith@abc.com';
console.log("Employee 's Id: " + emp.id);
console.log("Employee's name: " + emp.name);
console.log("Employee's Email ID: " + emp.email);

// if (!Array.prototype.first)
//   Array.prototype.first = function () {
//     return this[0];
//   };

// const arr = [1, 2, 3];
// console.log(arr.first());

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
