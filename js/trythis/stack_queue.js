class Stack {
  #arr; // [1, 2, ]
  constructor(...args) {
    if (Array.isArray(args[0])) {
      this.#arr = args[0];
    } else {
      this.#arr = args;
    }
  }

  push(item) {
    return this.#arr.push(item);
  }

  pop() {
    return this.#arr.pop();
  }

  print() {
    console.log(this.constructor.name, '=>', this.#arr);
  }
}

const stack = new Stack();
stack.push(1); // 추가하기
stack.push(2); // 추가하기
stack.push(3); // 추가하기
console.log(stack.pop()); // 마지막에 추가된 하나 꺼내기
stack.print();

const stack2 = new Stack([1, 2]);
stack2.print();
const stack3 = new Stack(1, 2, 3);
stack3.print();

class Queue {
  #arr; // [, 2, 3]
  constructor(...args) {
    if (Array.isArray(args[0])) {
      this.#arr = args[0];
    } else {
      this.#arr = args;
    }
  }

  enqueue(item) {
    return this.#arr.push(item);
  }

  dequeue() {
    return this.#arr.shift();
  }

  print() {
    console.log(this.constructor.name, this.#arr);
  }
}

const queue = new Queue();
queue.enqueue(1); // 추가하기
queue.enqueue(2); // 추가하기
queue.enqueue(3); // 추가하기
console.log(queue.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기
queue.print();
