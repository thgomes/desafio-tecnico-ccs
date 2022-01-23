import axiosParallel, { AxiosParallelInput, AxiosParallelResponse } from 'axios-parallel'

export async function parallelRequests (requests: AxiosParallelInput, allSuccededResponses: AxiosParallelResponse[]): Promise<AxiosParallelResponse[]> {
  try {
    const MAX_PARALLEL_REQUEST_PER_CPU = 100
    const responses: AxiosParallelResponse[] = await axiosParallel(requests, MAX_PARALLEL_REQUEST_PER_CPU)
    const succededResponses: AxiosParallelResponse[] = []
    const failedRequests: AxiosParallelInput = []

    responses.forEach(function (response) {
      if (response.details.statusCode === 200) {
        succededResponses.push(response)
      } else {
        failedRequests.push({
          method: 'GET',
          url: response.details.responseUrl
        })
      }
    })

    if (failedRequests.length === 0) {
      return [...succededResponses, ...allSuccededResponses]
    }

    return parallelRequests(failedRequests, [...succededResponses, ...allSuccededResponses])
  } catch (error) {
    throw new Error(error)
  }
}
