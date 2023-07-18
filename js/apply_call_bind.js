const hong = {id: 1, name: 'Hong'};
const kim = { id: 2, name: 'Kim' };

const expressFn = function (name) {
  this.name = name;
  console.log(this, new.target, this.name, this.id);
}

const arrowFn = (name) => {
  this.name = name;
  console.log(this, new.target, this.name, this.id);
}

console.log('this>>>', this)
expressFn.call(hong, 'expfn');
arrowFn.apply(kim, ['afn']);
// console.log('-----------------------')
// const dfn = new expressFn('D');
// const afn = arrowFn('A'); // error!