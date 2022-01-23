import { AxiosParallelInput } from 'axios-parallel'
import { parallelRequests } from '../services/parallelRequests'

export async function numbersExtractor () {
  const requests: AxiosParallelInput = []

  for (let page = 1; page <= 1000; page++) {
    requests.push({
      method: 'GET',
      url: `http://challenge.dienekes.com.br/api/numbers?page=${page}`
    })
  }
  try {
    const responses = await parallelRequests(requests, [])

    const numbers = []
    responses.forEach((response) => {
      numbers.push(...response.data.numbers)
    })

    return numbers
  } catch (error) {
    throw new Error(error)
  }
}
