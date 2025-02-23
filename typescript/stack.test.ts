import { expect } from "jsr:@std/expect/expect";
import { Stack } from "./stack.ts";

Deno.test("stack", async (t) => {
  await t.step("can push items", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect(stack.length).toBe(2);
  });

  await t.step("can pop items", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.length).toBe(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBe(undefined);
  });

  await t.step("can peak the next stack item", () => {
    const q = new Stack<number>();
    q.push(1);
    q.push(2);
    q.push(3);
    expect(q.peak()).toBe(3);
    expect(q.length).toBe(3);
  });
});
