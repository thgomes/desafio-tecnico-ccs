import { quickSort } from '../../services/quickSort'

export async function sortNumbersTransformer (numbers: number[]): Promise<number[]> {
  await quickSort(numbers)

  return numbers
}
