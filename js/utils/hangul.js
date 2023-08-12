const 가 = '가'.charCodeAt(0);
const ㄱ = 'ㄱ'.charCodeAt(0);
const ㅎ = 'ㅎ'.charCodeAt(0);
const ENGS = [108, 76, 109, 77, 110, 78, 114, 82]; //'lLmMnNrR';
const NUMS = [48, 49, 51, 54, 55, 56]; //'013678';

const isEndJaum = str => {
  if (!str) return;
  const s = str.charCodeAt(str.length - 1);
  if (s >= ㄱ && s <= ㅎ) return true;
  if (ENGS.includes(s) || NUMS.includes(s)) return true;
  return (s - 가) % 28 > 0;
  // const isJaumOnly = s >= ㄱ && s <= ㅎ;
  // const isJaumEng = ENGS.includes(s);
  // const isJaumNum = NUMS.includes(s);
  // const ret = isJaumOnly || isJaumEng || isJaumNum || (s - 가) % 28 > 0;
  // console.log('isEndJaum>>', str, s, ret);
  // return ret;
};

const josa = (str, josas) => {
  const [ja, mo] = josas.split('/');
  return `${str}${isEndJaum(str) ? ja : mo}`;
};

// const iga = str => (isEndJaum ? '이' : '가');
const iga = str => josa(str, '이/가');
const eunun = str => josa(str, '은/는');
const eulul = str => josa(str, '을/를');
const youya = str => josa(str, '이어야/여야');
const lang = str => josa(str, '이랑/랑');

const REG_HANGUL = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
const hasHangul = str => {
  const ret = REG_HANGUL.test(str);
  console.log('🚀  hasHangul:', str, ret);
  return ret;
};

const REG_NOT_HANGUL = /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
const isHangul = str => {
  const ret = !REG_NOT_HANGUL.test(str);
  console.log('🚀  isHangul:', str, ret);
  return ret;
};

// hasHangul('강원도'); // true
// hasHangul('ㄱㄴㄷ'); // true
// hasHangul('ㅜㅜㅠㅠ;'); // true
// hasHangul('케잌뷐'); // true
// hasHangul('12345'); // false
// hasHangul('IC'); // false
// hasHangul('양평IC'); // false

isHangul('강원도'); // true
isHangul('ㄱㄴㄷ'); // true
isHangul('ㅜㅜㅠㅠ;'); // true
isHangul('케잌뷐'); // true
isHangul('12345'); // false
isHangul('IC'); // false
hasHangul('양평IC'); // false

console.log(iga('고성군'));
console.log(iga('강원도'));
console.log(eunun('고성군'));
console.log(eulul('고성군'));
console.log(youya('고성군'));
console.log(eulul('강원도'));
console.log(lang('고성군'));
console.log(lang('강원도'));

// const x = [...'lLmMnNrR'].map(a => a.charCodeAt(0));
// console.log('🚀  x:', x);

// isEndJaum('강원도'); // false
// isEndJaum('바라당'); // true
// isEndJaum('ㅜㅜ'); // false
// isEndJaum('ㅜㅠ'); // false
// isEndJaum('ㅜㅣ'); // false
// isEndJaum('케잌'); // true
// isEndJaum('23ㅁ'); // true
// isEndJaum('23ㅅ'); // true
// isEndJaum('점수 A'); // false
// isEndJaum('24'); // false
// isEndJaum('알파벳L'); // true
// isEndJaum('23'); // true

export { isEndJaum, iga, eunun, eulul, youya, lang };
