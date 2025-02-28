import { expect } from "jsr:@std/expect";
import { quick_sort } from "./quick_sort.ts";

Deno.test("quick sort", () => {
  expect(quick_sort([4, 2, 1, 3, 5, 7, 6, 9, 8, 0])).toEqual([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ]);
});
