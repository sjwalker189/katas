export function bubble_sort(list: number[]): number[] {
  for (let i = 0; i < list.length; i++) {
    // the highest number will move to the end on each itteration
    // so we reduce the length we itterate in the inner loop moving
    // towards the left until all items are sorted
    for (let j = 0; j < list.length - 1 - i; j++) {
      // swap positions
      if (list[j] > list[j + 1]) {
        const tmp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = tmp;
      }
    }
  }
  return list;
}
