class Emp {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // accessor
  // get fullName() {
  //   return `${this.firstName} ${this.lastName}`;
  // }
}

const hong = new Emp('Gildong', 'Hong');

const proxyHong = new Proxy(hong, {
  get(target, prop) {
    // console.log('get>>', target, prop);
    if (prop === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    } else {
      return target[prop];
    }
  },

  set(target, prop, value) {
    // console.log('set>>', target, prop, value);
    if (prop === 'fullName') {
      const [f, l] = value.split(' ');
      target.firstName = f;
      target.lastName = l;
    }
  },
});

console.log(proxyHong.fullName);
proxyHong.fullName = 'Kildong Hong';
console.log(proxyHong.fullName);
