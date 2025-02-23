interface LinkedList<T> {
  get length(): number;
  append(v: T): void;
  prepend(v: T): void;
  insertAt(item: T, index: number): void;
  removeAt(index: number): T | undefined;
  remove(item: T): T | undefined;
  get(index: number): T | undefined;
}

class Node<T> {
  public value: T;
  public next: Node<T> | undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export class SinglelyLinkedList<T> implements LinkedList<T> {
  private head: Node<T> | undefined;
  private count = 0;

  get length() {
    return this.count;
  }

  append(item: T) {
    this.count++;

    if (this.head === undefined) {
      this.head = new Node(item);
      return;
    }

    let node = this.head;
    while (node !== undefined) {
      if (node.next === undefined) {
        node.next = new Node(item);
        break;
      }
      node = node.next;
    }
  }

  prepend(item: T) {
    const node = new Node(item);
    if (this.head !== undefined) {
      node.next = this.head;
    }
    this.head = node;
    this.count++;
  }

  insertAt(item: T, index: number): void {
    if (index <= 0) {
      this.prepend(item);
      return;
    }

    if (index > this.length - 1) {
      this.append(item);
      return;
    }

    // lhs should always be defined given the above bounds check
    const lhs = this.nodeAt(index - 1);
    if (lhs === undefined) {
      this.append(item);
      return;
    }

    const inserted = new Node(item);
    inserted.next = lhs.next;
    lhs.next = inserted;
    this.count++;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.count) {
      return undefined;
    }

    if (index === 0) {
      this.head = this.head?.next;
      this.count--;
      return;
    }

    const lhs = this.nodeAt(index - 1);
    if (lhs === undefined) {
      return;
    }

    // Remove the target node from the chain by linking the lhs node to the rhs node of the target index
    const node = lhs.next;

    lhs.next = node?.next;

    if (node !== undefined) {
      this.count--;
    }

    return node?.value;
  }

  remove(item: T) {
    if (this.head === undefined) {
      return;
    }

    if (this.head.value === item) {
      this.head = this.head.next;
      this.count--;
      return item;
    }

    let node = this.head!;
    for (let i = 0; i < this.count; i++) {
      if (node.next === undefined) {
        break;
      }

      if (node.next.value === item) {
        node.next = node.next?.next;
        this.count--;
        return item;
      }

      node = node.next;
    }

    return undefined;
  }

  get(index: number): T | undefined {
    return this.nodeAt(index)?.value;
  }

  private nodeAt(index: number): Node<T> | undefined {
    if (this.head === undefined || index < 0 || index >= this.length) {
      return undefined;
    }

    let lhs = this.head;
    for (let i = 0; i < index; i++) {
      if (lhs.next === undefined) {
        break;
      }
      lhs = lhs.next;
    }

    return lhs;
  }
}
