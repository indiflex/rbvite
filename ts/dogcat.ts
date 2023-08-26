class Animal {
  #name;

  constructor(name: string) {
    this.#name = name;
  }

  bark() {}
  getName() {
    return this.#name;
  }
}

class BaseAnimal extends Animal {
  private ani: Animal;

  constructor(aniOrName: string | Animal) {
    if (typeof aniOrName === 'string') {
      super(aniOrName);
      this.ani = new Animal(aniOrName);
    } else {
      super(aniOrName.getName());
      this.ani = aniOrName;
    }
  }
  // constructor(aniOrName: string | Animal) {
  //   super(typeof aniOrName === 'string' ? aniOrName : aniOrName.getName());
  //   this.ani =
  //     typeof aniOrName === 'string' ? new Animal(aniOrName) : aniOrName;
  // }

  bark(): void {
    super.bark();
    this.ani.bark();
  }
}

class Dog extends BaseAnimal {
  bark() {
    super.bark();
    console.log('멍!멍!');
  }
}

class Cat extends BaseAnimal {
  bark() {
    super.bark();
    console.log('야옹~');
  }
}
const x = new Dog(new Cat('개냥이'));
x.bark();

class X {
  constructor(public id: number) {}

  f() {
    console.log('f>>', this.id);
  }
}
const xx = new X(123);

console.log('------------------------');
const fns = {
  id: xx.id,
  f: xx.f,
  barkDog() {
    console.log('멍!멍!');
    return this;
  },
  barkCat() {
    console.log('야옹~');
    return this;
  },
};

// fns.barkCat().barkDog().f.apply(xx);
fns.barkCat().barkDog().f();
// fns.barkCat();
// fns.barkDog();
