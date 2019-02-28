import axios from 'axios'

import { requestPaginator } from './githubHelper'
import { ERRORS } from '../config/errors'

jest.mock('axios')

describe('requestPaginator test cases', () => {
  let testProps

  beforeEach(() => {
    jest.clearAllMocks()

    testProps = {
      index: 0,
      url: '',
      page: 1,
      result: {
        data: []
      },
      headers: {}
    }
  })

  it('requestPaginator() should fail and throw', async () => {
    axios.get.mockRejectedValue({})

    expect(requestPaginator(testProps)).rejects.toEqual(new Error(ERRORS.PAGINATED_REQUESTS.MESSAGE))
  })

  it('requestPaginator() should succeed with empty data from server and return proper response', async () => {
    // mock several calls in a row to test the recursive function
    axios.get.mockResolvedValueOnce({
      data: [1, 2, 3]
    }).mockResolvedValueOnce({
      data: [4, 5]
    }).mockResolvedValueOnce({
      data: []
    })

    const response = await requestPaginator({ ...testProps })

    expect(response).toEqual({
      data: [1, 2, 3, 4, 5]
    })
  })
})
