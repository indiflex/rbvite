// import * as exp from './export.js';
import def, { PI as PP, mod } from './export.js';
import { version, ARR, USERS } from './aggr.js';
def();

const { PI } = exp;
console.log('PI=', PI);
version;

const { a, b } = mod;
console.log('🚀  a,b:', a, b, mod.a);
console.log('🚀  PP:', PP);

console.log('🚀  arr1:', ARR.firstObject, ARR.lastObject);
import './arr.js';
