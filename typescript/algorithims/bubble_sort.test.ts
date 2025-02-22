import { expect } from "jsr:@std/expect/expect";
import { bubble_sort } from "./bubble_sort.ts";

Deno.test("bubble sort", () => {
  expect(bubble_sort([1, 2, 5, 4, 6, 3])).toEqual([1, 2, 3, 4, 5, 6]);
});
