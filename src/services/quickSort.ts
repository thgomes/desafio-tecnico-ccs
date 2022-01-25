export function quickSort (list: number[]) {
  quickSortRange(list, 0, list.length - 1)
}

function quickSortRange (list: number[], l: number, r: number) {
  if (l < r) {
    const p = partition(list, l, r)
    quickSortRange(list, l, p - 1)
    quickSortRange(list, p + 1, r)
  }
}

function partition (list: number[], l: number, r: number): number {
  let i: number = l
  const pivot: number = list[r]

  for (let j = l; j < r; ++j) {
    if (list[j] < pivot) {
      [list[j], list[i]] = [list[i], list[j]]
      ++i
    }
  }

  [list[i], list[r]] = [list[r], list[i]]
  return i
}
