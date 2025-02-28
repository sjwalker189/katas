export interface BinaryNode<T> {
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;
}

/**
 * Vist node before walking left and right
 */
export function pre_order_search<T>(
  node: BinaryNode<T> | undefined,
  path: T[] = [],
): T[] {
  if (node) {
    path.push(node.value);
    pre_order_search(node.left, path);
    pre_order_search(node.right, path);
  }

  return path;
}

/**
 * Vist node after walking left and before walking right
 */
export function order_search<T>(
  node: BinaryNode<T> | undefined,
  path: T[] = [],
): T[] {
  if (node) {
    order_search(node.left, path);
    path.push(node.value);
    order_search(node.right, path);
  }
  return path;
}

/**
 * Vist node after walking left and right
 */
export function post_order_search<T>(
  node: BinaryNode<T> | undefined,
  path: T[] = [],
): T[] {
  if (node) {
    post_order_search(node.left, path);
    post_order_search(node.right, path);
    path.push(node.value);
  }
  return path;
}
