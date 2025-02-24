import { expect } from "jsr:@std/expect";
import { RingBuffer } from "./ring_buffer.ts";

Deno.test("ring buffer", async (t) => {
  await t.step("can check for emptiness", () => {
    const rb = new RingBuffer(10);
    expect(rb.isEmpty()).toBe(true);
    expect(rb.isFull()).toBe(false);
    expect(rb.length).toBe(0);
    expect(rb.capacity).toBe(10);
  });

  await t.step("can check for fullness", () => {
    const rb = new RingBuffer<number>(1);
    rb.push(1);
    expect(rb.isEmpty()).toBe(false);
    expect(rb.isFull()).toBe(true);
    expect(rb.length).toBe(1);
    expect(rb.capacity).toBe(1);
  });

  await t.step("can pop items off in the right order", () => {
    const rb = new RingBuffer<string>(3);
    rb.push("a");
    rb.push("b");
    rb.push("c");
    expect(rb.pop()).toBe("a");
    expect(rb.pop()).toBe("b");
    expect(rb.pop()).toBe("c");
  });

  await t.step("size is contstrained", () => {
    const rb = new RingBuffer<string>(3);
    rb.push("a");
    rb.push("b");
    rb.push("c");
    expect(() => rb.push("d")).toThrow();
  });

  await t.step("can be resized maintaining order", () => {
    const rb = new RingBuffer<string>(3);
    rb.push("a");
    rb.push("b");
    rb.push("c");
    rb.resize(6);
    expect(rb.length).toBe(3);
    expect(rb.capacity).toBe(6);
    expect(rb.pop()).toBe("a");
    expect(rb.pop()).toBe("b");
    expect(rb.pop()).toBe("c");
    expect(rb.pop()).toBe(undefined);
    expect(rb.length).toBe(0);
  });

  await t.step("can be cleared of all values", () => {
    const rb = new RingBuffer<string>(3);
    rb.push("a");
    rb.push("b");
    rb.push("c");
    rb.pop();
    rb.push("d");
    rb.clear();
    expect(rb.length).toBe(0);
    expect(rb.capacity).toBe(3);
  });

  await t.step("can peak at the next value to pop", () => {
    const rb = new RingBuffer<string>(3);
    rb.push("a");
    rb.push("b");
    rb.push("c");
    expect(rb.peak()).toBe("a");
    expect(rb.length).toBe(3);
  });

  await t.step("can peak at the last value pushed", () => {
    const rb = new RingBuffer<string>(3);
    rb.push("a");
    rb.push("b");
    rb.push("c");
    expect(rb.back()).toBe("c");
    expect(rb.length).toBe(3);
  });
});
