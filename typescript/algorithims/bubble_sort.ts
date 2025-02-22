export function bubble_sort(list: number[]): number[] {
  let len = list.length - 1;

  do {
    for (let i = 0; i < len; i++) {
      const a = list[i];
      const b = list[i + 1];

      if (a > b) {
        list[i] = b;
        list[i + 1] = a;
      }
    }
    len--;
  } while (len !== 1);

  return list;
}
