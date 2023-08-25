const suites = new Map<string, Suite>();
suites.set('Spiderman', { weapon: 'spin a web!' });
suites.set('Ironman', { weapon: 'fire a palm!' });

class BaseAvengers implements Avengers {
  protected avenger: Avengers;
  constructor(avenger: Avengers) {
    this.avenger = avenger;
  }

  getName() {
    return this.avenger.getName();
  }

  attack() {
    // console.log('Attack in Base!');
    this.avenger.attack();
  }
}

class SpiderMan extends BaseAvengers {
  constructor(avenger: Avengers) {
    super(avenger);
  }

  attack() {
    super.attack();
    console.log('Attack in SpiderMan!!');
  }
}

class IronMan extends BaseAvengers {
  constructor(avenger: Avengers) {
    super(avenger);
  }

  attack() {
    super.attack();
    console.log('Attack in IronMan!!');
  }
}

class Avenger implements Avengers {
  #name: string;
  protected suite: Suite;
  constructor(name: string) {
    this.#name = name;
    this.suite = suites.get(name) ?? { weapon: 'flying' };
  }

  getName() {
    return this.#name;
  }

  attack() {
    console.log(`"${this.suite.weapon}"`, 'by', this.#name);
  }
}

moveout(new Avenger('XMan'));

const man1: Avengers = new SpiderMan(new IronMan(new Avenger('Ironman')));
moveout(man1);

function moveout(avenger: Avengers) {
  console.log(`------------- Move out ---> ${avenger.getName()} !!!!`);
  avenger.attack();
}

type Suite = { weapon: string };

interface Avengers {
  getName(): string;
  attack(): void;
}

console.log('================================');

class Animal {
  constructor(private name: string) {}
  bark() {
    console.log('동물울음');
  }
  getName() {
    return this.name;
  }
}

class AnimalSound extends Animal {
  animal?: Animal;
  constructor(animal: Animal | string) {
    super(animal instanceof Animal ? animal?.getName() : animal);
    if (animal instanceof Animal) this.animal = animal;
  }

  bark() {
    this.animal?.bark();
  }
}

class Dog extends AnimalSound {
  bark() {
    super.bark();
    console.log('멍!멍!', this.getName());
  }
}

class Cat extends AnimalSound {
  bark() {
    super.bark();
    console.log('야옹~', this.getName());
  }
}

const lucy = new Dog('Lucy');
lucy.bark();
const naavi = new Cat('Naavi');
console.log('------------------');
const max = new Dog(new Cat('Max'));
max.bark();

console.log('================================== mementoSound');
const mmt = mementoSound();
mmt.addSound(lucy);
mmt.addSound(naavi);
mmt.bark();

console.log('================================== memento');
const mmt2 = memento();
// mmt2.addSound(lucy.bark.bind(lucy));
mmt2.addSound(lucy.bark);
mmt2.addSound(naavi.bark);
mmt2.bark();

type VoidFn = () => void;
console.log('================================== memento by pure fn');
const fns = {
  name: '',
  dogSound() {
    console.log(this.name, '멍!멍!');
  },
  catSound() {
    console.log(this.name, '야옹~!');
  },

  dogCatSound() {
    this.dogSound();
    this.catSound();
  },

  dogCatSound2(name: string) {
    this.name = name;
    this.dogSound();
    this.catSound();
  },
};

const mmt3 = memento(fns);
mmt3.addSound(fns.dogSound);
mmt3.addSound(fns.catSound);
mmt3.addSound(fns.dogCatSound);
// mmt3.addSound(fns.dogCatSound2.bind(fns, '개냥이'));
mmt3.bark();

function memento(x?: {}) {
  const sounds: VoidFn[] = [];
  return {
    ...x,
    name: '개냥이',
    getName() {
      return this.name;
    },
    addSound(sound: VoidFn) {
      sounds.push(sound);
    },
    bark() {
      // bark: () => {
      // sounds.forEach(sound => sound());
      sounds.forEach(sound => sound.call(this));
      // sounds.forEach(sound => sound.call(fns));
    },
  };
}
function mementoSound() {
  const animals: Animal[] = [];
  return {
    addSound(animal: Animal) {
      animals.push(animal);
    },
    bark() {
      animals.forEach(ani => ani.bark());
    },
  };
}

export {};
