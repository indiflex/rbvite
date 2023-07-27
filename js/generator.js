function* route() {
  const start = yield '출발 역은?';
  const end = yield '도착 역은?';
  return `${start}역에서 출발하여 ${end}역에 도착합니다.`;
}

const caller = route();
console.log('🚀  caller:', caller);

const r1 = caller.next();
console.log('🚀  r1:', r1);

const r2 = caller.next('문래');
console.log('🚀  r2:', r2);

const r3 = caller.next('신림');
console.log('🚀  r3:', r3);
