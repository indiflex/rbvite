"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xuser = void 0;
const x = 2;
let a;
a = x;
let b = 'abc';
a = b;
function f1(cb, x) {
    cb(x);
}
const cbf = (s) => !!s.match(/hong/i);
f1(cbf, 'hong kildong');
const hong = { id: 1, name: 'Hong', addr: 'Seoul' };
const xuser = hong;
exports.xuser = xuser;
const yuser = hong;
console.log('------------- decorator -----------------');
const history = (target, key, descriptor) => {
    console.log('history>>', descriptor.value);
    console.table({ class: target.constructor.name, method: key });
    const org = descriptor.value;
    descriptor.value = function (...args) {
        console.log('**********', key, args);
        org.call(this, ...args);
    };
};
class Sign {
    system;
    constructor(system) {
        this.system = system;
    }
    login(id, pw) {
        console.log('login>>', id, pw, this.system);
    }
    logout(id) {
        console.log('logout>>', id, this.system);
    }
}
__decorate([
    history
], Sign.prototype, "login", null);
__decorate([
    history
], Sign.prototype, "logout", null);
const signer = new Sign('TS');
signer.login('hong', 'password');
signer.logout('hong');
signer.login('kim', 'password');
//# sourceMappingURL=b.js.map