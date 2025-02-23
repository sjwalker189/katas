interface IQueue<T> {
  enqueue(item: T): void;
  deque(): void;
  peak(): T | undefined;
}

class Node<T> {
  public value: T;
  public next: Node<T> | undefined;
  constructor(value: T) {
    this.value = value;
  }
}

export class Queue<T> implements IQueue<T> {
  public length = 0;
  private head: Node<T> | undefined;
  private tail: Node<T> | undefined;

  enqueue(item: T) {
    const node = new Node(item);

    this.length++;

    if (this.tail === undefined) {
      this.tail = this.head = node;
      return;
    }

    // Tail will always be defined when head is defined
    this.tail!.next = node;
    this.tail = node;
  }

  deque() {
    const head = this.head;

    if (head === undefined) {
      return;
    }

    this.length--;
    this.head = head.next;

    if (head.next === undefined) {
      this.tail = undefined;
    } else {
      head.next = undefined;
    }

    return head.value;
  }

  peak() {
    return this.head?.value;
  }
}
