import axios from 'axios'
import { get, isEmpty, union } from 'lodash'

import { requestPaginator } from './githubHelper'
import { ENDPOINTS } from '../config/endpoints'
import { ERRORS, ERROR_TYPES } from '../config/errors'

/**
 * getHeaders
 * @summary Get headers for authorization with token
 * @param {Object} obj - An object.
 * @param {string} obj.Authorization - userId with which we will find the repository associated to it
 * @returns {Object}
 */
function getHeaders () {
  return !isEmpty(process.env.REACT_APP_GITHUB_TOKEN) ? {
    'Authorization': `token  ${process.env.REACT_APP_GITHUB_TOKEN}`
  } : {}
}

/**
 * getTotalFollowers
 * @summary Return the total number of followers given a github user userId
 * @param {Object} obj - An object.
 * @param {string} obj.userId - userId with which we will find the amount of followers
 * @returns {Promise}
 */
export async function getTotalFollowers ({ userId, index }) {
  if (!userId) {
    return Promise.resolve({
      totalFollowers: 0,
      index
    })
  }

  try {
    const request = await axios.get(ENDPOINTS.FOLLOWERS({ userId }), {
      headers: getHeaders()
    })

    if (request.status === 200) {
      return {
        followers: get(request, 'data', []),
        totalFollowers: get(request, 'data.length', 0),
        index
      }
    }
  } catch (err) {
    throw new Error(ERRORS.REPOSITORIES.MESSAGE)
  }
}

/**
 * getTotalStars
 * @summary Return the total number of repositories given a github userId
 * @param {Object} obj - An object.
 * @param {string} obj.userId - userId with which we will find the repository associated to it
 * @param {string} obj.index - index to retain the user location from an array
 * @returns {Promise}
 */
export async function getTotalStars ({ userId, index }) {
  if (!userId) {
    return Promise.resolve({
      totalStars: 0,
      index
    })
  }

  try {
    const { data } = await requestPaginator({
      url: ENDPOINTS.STARS({ userId }),
      headers: getHeaders(),
      page: 1,
      result: { data: [], index }
    })

    return {
      totalStars: get(data, 'length', 0),
      index
    }
  } catch (err) {
    throw new Error(ERRORS.STARS.MESSAGE)
  }
}

/**
 * getTotalRepositories
 * @summary Return the total number of repositories given a github userId
 * @param {Object} obj - An object.
 * @param {string} obj.userId - userId with which we will find the repository associated to it
 * @returns {Promise}
 */
export async function getTotalRepositories ({ userId, index }) {
  if (!userId) {
    return Promise.resolve({
      totalRepositories: 0,
      index
    })
  }

  try {
    const { data } = await requestPaginator({
      url: ENDPOINTS.REPOSITORIES({ userId }),
      headers: getHeaders(),
      page: 1,
      result: { data: [], index }
    })

    let result = data.reduce((accumulator, repository) => {
      ++accumulator.totalRepositories

      return accumulator
    }, {
      totalRepositories: 0,
      index
    })

    return result
  } catch (err) {
    throw new Error(ERRORS.REPOSITORIES.MESSAGE)
  }
}

/**
 * getUsers
 * @summary Return a list of users given an input
 * @param {Object} obj - An object.
 * @param {string} obj.text - text input
 * @param {string} obj.sortType - sortType can either be score, repositories or followers
 * @returns {Promise}
 */
export async function getUsers ({ text = '', sortType = null }) {
  if (!text) {
    return Promise.resolve({ users: [] })
  }

  try {
    const searchRequest = await axios.get(ENDPOINTS.SEARCH, {
      headers: getHeaders(),
      params: {
        q: text,
        sort: sortType
      }
    })

    if (searchRequest.status === 200) {
      let users = []

      let repositoryPromises = []
      let followerPromises = []
      let starPromises = []

      users = get(searchRequest, 'data.items', [])

      users.forEach((user, index) => {
        const { login: userId } = user

        repositoryPromises.push(getTotalRepositories({ userId, index }))
        followerPromises.push(getTotalFollowers({ userId, index }))
        starPromises.push(getTotalStars({ userId, index }))
      })

      const promiseContainer = await Promise.all(union(
        repositoryPromises,
        followerPromises,
        starPromises
      ))

      promiseContainer.forEach((userData) => {
        users[userData.index] = {
          ...users[userData.index],
          ...userData
        }
      })

      return {
        users,
        error: null
      }
    }
  } catch (err) {
    return {
      users: [],
      error: ERROR_TYPES.INTERNAL_ERROR,
      message: ERRORS.SEARCH.MESSAGE
    }
  }
}
