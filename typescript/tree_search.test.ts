import { expect } from "jsr:@std/expect/expect";
import { type BinaryNode } from "./tree_pre_order_search.ts";
import {
  order_search,
  post_order_search,
  pre_order_search,
} from "./tree_pre_order_search.ts";

const tree: BinaryNode<number> = {
  value: 10,
  left: {
    value: 11,
    left: {
      value: 18,
    },
    right: {
      value: 19,
    },
  },
  right: {
    value: 20,
    left: {
      value: 21,
      left: {
        value: 28,
      },
      right: {
        value: 29,
      },
    },
  },
};

Deno.test("tree search", async (t) => {
  await t.step("pre order search ", () => {
    const result = pre_order_search(tree);
    expect(result).toEqual([10, 11, 18, 19, 20, 21, 28, 29]);
  });

  await t.step("in order search ", () => {
    const result = order_search(tree);
    expect(result).toEqual([18, 11, 19, 10, 28, 21, 29, 20]);
  });

  await t.step("post order search ", () => {
    const result = post_order_search(tree);
    expect(result).toEqual([18, 19, 11, 28, 29, 21, 20, 10]);
  });
});
