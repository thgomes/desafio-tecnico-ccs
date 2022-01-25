import SortedNumbersLoader from '../etl/loaders/sortedNumbersLoader'

class SortedNumbersController {
  constructor () {
    SortedNumbersLoader.loadSortedNumbers()
  }

  async index (req, res) {
    const { page = 1 } = req.query

    if (SortedNumbersLoader.status !== 'FINISHED') {
      return res.json({
        message: 'The data is being processed, please try again in a while',
        status: SortedNumbersLoader.status
      })
    }

    const sortedNumbers = SortedNumbersLoader.sortedNumbers.slice((page - 1) * 100, page * 100)

    return res.json({
      sortedNumbers: sortedNumbers
    })
  }
}

export default new SortedNumbersController()
