interface Avengers {
  moveout(): void;
}

class Avenger implements Avengers {
  constructor(public name: string) {}
  moveout() {}
}

class BaseAvengers implements Avengers {
  constructor(public avenger: Avengers) {}
  moveout() {
    this.avenger.moveout();
  }
}

class SpiderMan extends BaseAvengers {
  moveout() {
    super.moveout();
    console.log('SpiderWeb!!');
  }
}

class IronMan extends BaseAvengers {
  moveout() {
    super.moveout();
    console.log('ParmFire!');
  }
}

const a = new Avenger('Peter');
// const s = new SpiderMan(a);
// s.moveout();
// const i = new IronMan(a);
// i.moveout();
const si = new IronMan(new SpiderMan(a));
si.moveout();
console.log('-------------------');
a.moveout();
