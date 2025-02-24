// Notes to help me grok this later:
//
// Pushing moves the head along the ring buffer
// Poping reduces the length of items from the opposite side
// The head eventually moves past the tail.
// We use the modulous operatorto find the correct index position based on the current head and length of items added
// Capacity is fixed so we will overrite items if we continue to push without poping OR we add a guard to prevent this.
// Resizing could be made to be implicit when the buffer is full.
// e.g.
// rb.push(value)
// is full ? rb.resize(this.cap*2);

export class RingBuffer<T> {
  private len: number;
  private cap: number;
  private list: T[];

  private head: number;
  private tail: number;

  constructor(size: number) {
    if (size < 1) {
      throw new Error("size must be a positive int greater than 1");
    }
    this.len = 0;
    this.head = 0;
    this.tail = 0;
    this.cap = size;
    this.list = new Array(size).fill(undefined);
  }

  get capacity() {
    return this.cap;
  }

  get length() {
    return this.len;
  }

  isFull() {
    return this.len === this.cap;
  }

  isEmpty() {
    return this.len === 0;
  }

  push(item: T) {
    if (this.isFull()) {
      throw new Error("Ring buffer is full");
    }

    this.list[this.head] = item;
    this.head = (this.head + 1) % this.cap;
    this.len++;
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.list[this.tail];

    // @ts-expect-error: unsetting value
    this.list[this.tail] = undefined;
    this.tail = (this.tail + 1) % this.cap;
    this.len--;

    return item;
  }

  peak(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.list[this.tail];
  }

  back(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.list[(this.tail + this.len - 1) % this.cap];
  }

  resize(newSize: number) {
    const copy = new Array(newSize).fill(undefined);
    for (let i = 0; i < this.len; i++) {
      copy[i] = this.list[i % this.cap];
    }
    this.cap = newSize;
    this.list = copy;
    this.head = this.len - 1;
    this.tail = 0;
  }

  clear() {
    // TODO: can be optimised to only itterate between the head and tail bounds
    for (let i = 0; i < this.cap; i++) {
      // @ts-ignore: unset values
      this.list[i] = undefined;
    }
    this.len = 0;
    this.head = 0;
    this.tail = 0;
  }
}
