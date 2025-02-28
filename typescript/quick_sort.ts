function qs(arr: number[], lo: number, hi: number) {
  if (lo >= hi) {
    return;
  }

  // Initially partition the array between the current bounds
  // We use the resulting index to recurse to the left and right
  // partitioning until the array is fully sorted.
  const pivotIdx = partition(arr, lo, hi);

  qs(arr, lo, pivotIdx - 1);
  qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number) {
  const pivot = arr[hi];

  // The partition index starts outside the bounds
  let idx = lo - 1;

  // Move all items in the array that are lower than the pivot value to the left
  // Shift the partition bounds to the right as we move items to the left
  for (let i = lo; i < hi; ++i) {
    if (arr[i] <= pivot) {
      idx++;
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }

  // Move the partition index along to the next position
  // We need to move the partiion value to this position
  idx++;
  arr[hi] = arr[idx];
  arr[idx] = pivot;

  // All items preceding idx will be lower that our pivot value
  return idx;
}

export function quick_sort(arr: number[]) {
  qs(arr, 0, arr.length - 1);
  return arr;
}
