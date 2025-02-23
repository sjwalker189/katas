import { expect } from "jsr:@std/expect/expect";
import { Queue } from "./queue.ts";

Deno.test("queue", async (t) => {
  await t.step("can enqueue items", () => {
    const q = new Queue<number>();
    q.enqueue(1);
    expect(q.length).toBe(1);
  });

  await t.step("can dequeue items", () => {
    const q = new Queue<number>();
    q.enqueue(1);
    const one = q.deque();
    expect(q.length).toBe(0);
    expect(one).toBe(1);

    const two = q.deque();
    expect(q.length).toBe(0);
    expect(two).toBe(undefined);
  });

  await t.step("can peak the next queued item", () => {
    const q = new Queue<number>();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.peak()).toBe(1);
  });
});
