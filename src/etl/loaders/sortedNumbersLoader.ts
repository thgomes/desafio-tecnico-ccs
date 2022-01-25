import { numbersExtractor } from '../extractors/numbersExtractor'
import { sortNumbersTransformer } from '../transformers/sortNumbersTransformer'

class SortedNumbersLoader {
  private numbers = []
  public status = ''
  public sortedNumbers = []

  async loadSortedNumbers (): Promise<void> {
    this.status = 'EXTRACTING'
    this.numbers = await numbersExtractor()

    this.status = 'SORTING'
    this.sortedNumbers = await sortNumbersTransformer(this.numbers)

    this.status = 'FINISHED'
  }
}

export default new SortedNumbersLoader()
