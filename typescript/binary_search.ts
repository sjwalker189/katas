export function bs_list(haystack: number[], needle: number) {
  let lo = 0;
  let hi = haystack.length - 1;

  do {
    const m = Math.floor(lo + (hi - lo) / 2);
    const v = haystack[m];

    if (v === needle) {
      return m;
    } else if (v > needle) {
      // Needle will be to the left
      hi = m;
    } else {
      // Needle will be to the right
      lo = m + 1;
    }
  } while (lo < hi);

  // Needle does not exist in the haystack
  return -1;
}
