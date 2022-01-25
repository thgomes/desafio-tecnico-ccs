import SortedNumbersLoader from '../etl/loaders/sortedNumbersLoader'

class SortedNumbersController {
  constructor () {
    SortedNumbersLoader.loadSortedNumbers()
  }

  async index (req, res) {
    if (SortedNumbersLoader.status === 'FINISHED') {
      return res.json({
        sortedNumbers: SortedNumbersLoader.sortedNumbers
      })
    }

    return res.json({
      message: 'The data is being processed, please try again in a while',
      status: SortedNumbersLoader.status
    })
  }
}

export default new SortedNumbersController()
