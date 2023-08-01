class Collection {
  #arr; // [1, 2, ]
  constructor(...args) {
    if (Array.isArray(args[0])) {
      this.#arr = args[0];
    } else {
      this.#arr = args || [];
    }
  }

  get arr() {
    return this.#arr;
  }

  get isEmpty() {
    return this.#arr.length === 0;
  }

  get length() {
    return this.#arr.length;
  }

  toArray() {
    return [...this.#arr];
  }

  iterator() {
    return this[Symbol.iterator]();
  }

  has(val) {
    return this.#arr.indexOf(val) !== -1;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i += 1) yield this.arr[i];
  }

  clear() {
    // this.#arr = []; //
    this.#arr.length = 0;
  }

  print() {
    console.log(this.constructor.name, '=>', this.#arr);
  }
}

class Stack extends Collection {
  get peek() {
    return this.arr[super.arr.length - 1];
  }
  get poll() {
    return this.pop();
  }
  get remove() {
    this.pop();
  }

  push(item) {
    return this.arr.push(item);
  }

  pop() {
    return this.arr.pop();
  }

  *[Symbol.iterator]() {
    for (let idx = this.arr.length - 1; idx >= 0; idx -= 1) {
      yield this.arr[idx];
    }
  }

  // [Symbol.iterator]() {
  //   let idx = this.arr.length;
  //   return {
  //     next: () => {
  //       idx -= 1;
  //       if (idx < 0) return { done: true };
  //       return { value: this.arr[idx], done: false };
  //     },
  //   };
  // }
}

const stack = new Stack();
stack.push(1); // 추가하기
stack.push(2); // 추가하기
stack.push(3); // 추가하기
console.log(stack.pop()); // 마지막에 추가된 하나 꺼내기
stack.print();
console.log('stack.iter>>', [...stack]);
const itStack = stack.iterator();
console.log('🚀  itStack:', itStack.next());

// const stack2 = new Stack([1, 2]);
// stack2.print();
// const stack3 = new Stack(1, 2, 3);
// stack3.print();

class Queue extends Collection {
  get peek() {
    return super.arr[0];
  }

  get poll() {
    return this.dequeue();
  }

  remove() {
    this.dequeue();
  }

  enqueue(item) {
    return this.arr.push(item);
  }

  dequeue() {
    return this.arr.shift();
  }

  // *[Symbol.iterator]() {
  //   let idx = -1;
  //   return {
  //     next: () => {
  //       idx += 1;
  //       if (idx >= this.length) return { done: true };
  //       return { value: this.arr[idx], done: false };
  //     },
  //   };
  // }
}

const queue = new Queue();
queue.enqueue(1); // 추가하기
queue.enqueue(2); // 추가하기
queue.enqueue(3); // 추가하기
console.log(queue.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기
queue.print();

console.log('stack.peek>>', stack.peek);
console.log('queue.peek>>', queue.peek);
console.log('queue.iter>>', [...queue]);
const itQueue = queue.iterator();
console.log('🚀  itQueue:', itQueue.next());

stack.clear();
queue.clear();
console.log('stack.isEmpty>>', stack.isEmpty);
console.log('queue.isEmpty>>', queue.isEmpty);

class ArrayList extends Collection {
  get(idx) {
    return this.arr[idx];
  }

  set(idx, val) {
    return (this.arr[idx] = val);
  }

  add(val, idx) {
    idx = idx ?? this.length;
    this.arr.splice(idx, 0, val);
  }

  remove(val) {
    const idx = this.arr.indexOf(val);
    this.arr.splice(idx, 1);
  }

  contains(val) {
    return this.has(val);
  }

  arrayToList() {
    let node2;
    for (let i = this.arr.length - 1; i >= 0; i -= 1) {
      node2 = { value: this.arr[i], rest: node2 };
    }
    return node2;
  }

  listToArray(list) {
    const arr = [];
    let node = list;
    while (true) {
      arr.push(node.value);
      node = node?.rest;

      if (!node) break;
    }
    return arr;
  }

  get size() {
    return this.length;
  }

  print() {
    console.log(
      this.constructor.name,
      '=>\n',
      JSON.stringify(this.arrayToList(), null, '  ')
    );
  }
}

console.log('----------------------');
const alist = new ArrayList(1, 2, 3);
alist.print();
const lst = alist.arrayToList();
console.log('🚀  lst:', lst);
const arr = alist.listToArray(lst);
console.log('🚀  arr:', arr);
alist.remove(2);
alist.print();
alist.add(4);
alist.print();
alist.add(22, 1);
alist.print();
alist.set(1, 300);
alist.print();
console.log(alist.iterator().next());
alist.clear();
console.log('alist.isEmpty>>', alist.isEmpty);
