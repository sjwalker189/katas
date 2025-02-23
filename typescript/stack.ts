interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peak(): T | undefined;
}

class Node<T> {
  public value: T;
  public prev: Node<T> | undefined;
  constructor(value: T) {
    this.value = value;
  }
}

export class Stack<T> implements IStack<T> {
  public length = 0;
  private tail: Node<T> | undefined;

  push(item: T) {
    const node = new Node(item);

    this.length++;

    if (this.tail === undefined) {
      this.tail = node;
      return;
    }

    node.prev = this.tail;
    this.tail = node;
  }

  pop() {
    const tail = this.tail;
    if (tail === undefined) {
      return;
    }

    this.length--;
    this.tail = tail.prev;

    tail.prev = undefined;
    return tail.value;
  }

  peak() {
    return this.tail?.value;
  }
}
