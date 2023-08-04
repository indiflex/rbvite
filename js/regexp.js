const regex = /^[A-z0-9][\w-\.]*@[\w-]+\..*([A-z]{2,7})$/;
// const isValidEmailAddress = s => regex.test(s);
const isValidEmailAddress = str => {
  const isValid = regex.test(str);
  console.log(str, isValid);
};

isValidEmailAddress('jade123@topician.com'); // true
isValidEmailAddress('jade123@topician.store'); // true
isValidEmailAddress('jade123@topi.cian.sto.re'); // true
isValidEmailAddress('ja_de.j-u-n@topician.store'); // true
isValidEmailAddress('jade123@topician'); // false
isValidEmailAddress('jade@jeon@topician.store'); // false
isValidEmailAddress('jade@jeon@.topician.store'); // false
isValidEmailAddress('jade123@topi.cian.sto.r9e'); // false

const str = 'Senior Coding Learning JS';
// const x = str.replace(/([A-Z])([a-z])*/g, `${$1.toLowerCase()}`);
// console.log('🚀  x:', x);
const ret = str.replace(/[A-Z]/g, (a, i) => `*${a.toLowerCase()}*-`);
console.log('🚀  ret:', ret);
