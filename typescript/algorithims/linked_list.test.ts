import { expect } from "jsr:@std/expect/expect";
import { SinglelyLinkedList } from "./linked_list.ts";

Deno.test("singley linked list", async (t) => {
  await t.step("can get nodes at an index", () => {
    const list = new SinglelyLinkedList<number>();
    list.append(1);
    list.append(2);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(-1)).toBe(undefined);
    expect(list.get(10)).toBe(undefined);
  });

  await t.step("can append and prepend nodes", () => {
    const list = new SinglelyLinkedList();
    list.append(1);
    list.append(2);
    list.prepend(3);
    expect(list.length).toBe(3);
    expect(list.get(0)).toBe(3);
    expect(list.get(1)).toBe(1);
    expect(list.get(2)).toBe(2);
  });

  await t.step("can insert nodes at index", () => {
    const list = new SinglelyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    list.insertAt(100, 1);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(100);
    expect(list.get(2)).toBe(2);

    list.insertAt(200, -1);
    expect(list.get(0)).toBe(200);
    expect(list.get(1)).toBe(1);

    list.insertAt(300, 100);
    expect(list.get(4)).toBe(3);
    expect(list.get(5)).toBe(300);

    expect(list.length).toBe(6);
  });

  await t.step("can remove nodes at index", () => {
    const list = new SinglelyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    list.removeAt(1);

    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(3);

    list.append(4);
    list.append(5);
    list.append(6);

    list.removeAt(-1);
    expect(list.length).toBe(5);

    list.removeAt(10);
    expect(list.length).toBe(5);

    list.removeAt(4);
    expect(list.length).toBe(4);
    expect(list.get(3)).toBe(5);

    list.removeAt(0);
    expect(list.length).toBe(3);
    expect(list.get(0)).toBe(3);
  });

  await t.step("can remove nodes by value", () => {
    const list = new SinglelyLinkedList<string>();
    list.append("a");
    list.append("b");
    list.append("c");

    list.remove("b");
    expect(list.length).toBe(2);
    expect(list.get(0)).toBe("a");
    expect(list.get(1)).toBe("c");

    list.remove("z");
    expect(list.length).toBe(2);
  });
});
