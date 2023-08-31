"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Enumerable(enumerable) {
    return function (target, key, descriptor) {
        descriptor.enumerable = enumerable;
    };
}
function parseClass(cls) {
    return class extends cls {
        xxx = cls.constructor.name;
        callLog(method, ...args) {
            this[method](...args);
        }
    };
}
let BaseService = class BaseService {
    svcA;
    constructor(svcA) {
        this.svcA = svcA;
    }
    doSomething() {
        this.svcA.hello();
    }
    log(id, name) {
        console.log(id, '- private-log -', name);
    }
};
__decorate([
    Enumerable(true)
], BaseService.prototype, "doSomething", null);
BaseService = __decorate([
    parseClass
], BaseService);
function gen(c) {
    return class extends c {
        callLog(method, ...args) {
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
for (const k in bs)
    console.log('k1>>', k);
for (const k in bs2)
    console.log('k2>>', k);
bs2.callLog('log', 10, 'Kim');
function deco(target, key, descriptor) {
    console.log('🚀  key:', key);
    console.log(target.constructor.name);
    console.log(descriptor);
    const orgFn = descriptor.value;
    descriptor.value = () => {
        console.log('decooooooooooooooooo');
        orgFn();
    };
}
function decofn(...args) {
    console.log('decofn>>>>>>', ...args);
    return function (target, key, descriptor) {
        const orgFn = descriptor.value;
        descriptor.value = (...args) => {
            console.log('decooooooooooooooooo');
            orgFn(...args);
        };
    };
}
function clsDeco(cls) {
    console.log('class-deco!!');
    return class extends cls {
        otherProp = 'xxx';
    };
}
function autoincrement(start) {
    return function (target, propertyKey) {
        let val = target[propertyKey] || start;
        console.log('🚀  val:', val);
        function getter() {
            return `GET ${val}`;
        }
        function setter(val) {
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
function Validate(target, key, descriptor) {
    const orgFn = descriptor.value;
    console.log('🚀  Validate.orgFn:', orgFn, Object.keys(target.validators));
    descriptor.value = function (...args) {
        Object.keys(target.validators).forEach(k => {
            if (!target.validators[k](args))
                throw new Error('Not Valid');
        });
        orgFn.apply(this, args);
    };
}
function MinLength(len) {
    console.log('MinLength!!!!!', len);
    return function (target, key, pidx) {
        console.log('target.validators>>', target.validators);
        target.validators = target.validators ?? {};
        target.validators['minLength'] = function (args) {
            return args[pidx].length >= len;
        };
    };
}
function MaxLength(len) {
    console.log('MaxLength!!!!!', len);
    return function (target, key, pidx) {
        console.log('target.validators>>', target.validators);
        target.validators = target.validators || {};
        target.validators['maxLength'] = function (args) {
            console.log('max>>', args[pidx].length, len);
            return args[pidx].length <= len;
        };
    };
}
let TestClass = class TestClass {
    id = '';
    hello(name, addr) {
        console.log(`Hello, ${name} in ${addr}!!`);
    }
    testfn(n) {
        console.log('testfn!!', n);
    }
    test() {
        console.log('test!!');
    }
};
__decorate([
    autoincrement('10')
], TestClass.prototype, "id", void 0);
__decorate([
    Validate,
    __param(0, MinLength(3)),
    __param(1, MaxLength(5))
], TestClass.prototype, "hello", null);
__decorate([
    decofn('x', 'y')
], TestClass.prototype, "testfn", null);
__decorate([
    deco
], TestClass.prototype, "test", null);
TestClass = __decorate([
    clsDeco
], TestClass);
const c = new TestClass();
console.log('🚀  c:', c, ', id=', c.id);
c.id = 'xxxx';
console.log('🚀  id:', c.id);
c.testfn(2);
c.hello('홍길동', '서울특별시');
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
Strategy.prototype.authenticate = function (id) {
    console.log('Strategy.authenticate>>>', id);
};
Strategy();
//# sourceMappingURL=deco.js.map