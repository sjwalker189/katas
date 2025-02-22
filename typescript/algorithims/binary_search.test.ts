import { expect } from "jsr:@std/expect";
import { bs_list } from "./binary_search.ts";

Deno.test("binary search list", () => {
  const list = [1, 2, 5, 7, 8, 13, 24, 32];

  expect(bs_list(list, 5)).toBe(2);
  expect(bs_list(list, 24)).toBe(6);
  expect(bs_list(list, 100)).toBe(-1);
});
