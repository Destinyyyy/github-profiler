import axios from 'axios'
import { ERRORS } from '../config/errors'

/**
 * requestPaginator
 * @summary Recursive function to retrieve a list of elements from a paginable endpoint
 * @param {Object} obj - An object.
 * @param {string} obj.url - url endpoint to hit
 * @param {string} obj.userId - userId
 * @param {number} obj.page - page
 * @param {Object} result - result that will be given in the end
 * @param {Object} result.data - data representing all the elements
 * @returns {Promise}
 */
export async function requestPaginator ({ index, url, page = 1, result, headers }) {
  try {
    const response = await axios.get(url, {
      headers,
      params: {
        page
      }
    })

    if (response.data.length <= 0) {
      return result
    } else {
      result = {
        ...result,
        data: [...result.data, ...response.data]
      }

      return requestPaginator({ index, url, page: page + 1, result, perPage: 100 })
    }
  } catch (err) {
    throw new Error(ERRORS.PAGINATED_REQUESTS.MESSAGE)
  }
}
