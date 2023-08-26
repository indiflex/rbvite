"use strict";
class Avenger {
    name;
    constructor(name) {
        this.name = name;
    }
    moveout() { }
}
class BaseAvengers {
    avenger;
    constructor(avenger) {
        this.avenger = avenger;
    }
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
const si = new IronMan(new SpiderMan(a));
si.moveout();
console.log('-------------------');
a.moveout();
//# sourceMappingURL=avengers.js.map