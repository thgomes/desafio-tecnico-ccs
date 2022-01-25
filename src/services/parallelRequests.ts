import axiosParallel, { AxiosParallelInput, AxiosParallelResponse } from 'axios-parallel'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function parallelRequests (requests: AxiosParallelInput | any, allSuccededResponses: AxiosParallelResponse[]): Promise<AxiosParallelResponse[]> {
  try {
    const MAX_PARALLEL_REQUEST_PER_CPU = 100
    const responses: AxiosParallelResponse[] = await axiosParallel(requests, MAX_PARALLEL_REQUEST_PER_CPU)
    const succededResponses: AxiosParallelResponse[] = []

    responses.forEach(function (response) {
      if (response.details.statusCode === 200) {
        succededResponses.push(response)
      }
    })

    succededResponses.forEach((response) => {
      requests.splice(requests.indexOf({
        method: 'GET',
        url: response.details.responseUrl
      }), 1)
    })

    if (requests.length === 0) {
      return [...succededResponses, ...allSuccededResponses]
    }

    return parallelRequests(requests, [...succededResponses, ...allSuccededResponses])
  } catch (error) {
    throw new Error(error)
  }
}
