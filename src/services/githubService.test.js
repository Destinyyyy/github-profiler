import axios from 'axios'

import * as GithubService from './githubService'
import * as GithubHelper from './githubHelper'
import { ERRORS } from '../config/errors'

jest.mock('./githubHelper')
jest.mock('axios')

describe('githubService test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getTotalFollowers cases', () => {
    it('getTotalFollowers() should succeed and return proper formatted response', async () => {
      const testProps = {
        userId: 1,
        index: 0
      }

      const response = {
        status: 200,
        data: [{ id: 1 }]
      }

      axios.get.mockResolvedValue(response)

      const followers = await GithubService.getTotalFollowers({ ...testProps })

      expect(followers).toEqual({
        followers: response.data,
        totalFollowers: response.data.length,
        index: testProps.index
      })
    })

    it('getTotalFollowers() should fail and throw an error', () => {
      const testProps = {
        userId: 1,
        index: 0
      }

      axios.get.mockRejectedValue({})

      expect(
        GithubService.getTotalFollowers({ ...testProps })
      ).rejects.toEqual(new Error(ERRORS.REPOSITORIES.MESSAGE))
    })

    it('getTotalFollowers() should return response when no userId is given', async () => {
      const response = await GithubService.getTotalFollowers({ index: 0, userId: null })

      expect(response).toEqual({
        totalFollowers: 0,
        index: 0
      })
    })
  })

  describe('getTotalRepositories cases', () => {
    it('getTotalRepositories() should succeed and return proper formatted response', async () => {
      const testProps = {
        userId: 1,
        index: 0
      }

      const response = {
        status: 200,
        data: [
          { id: 2 },
          { id: 1 }
        ]
      }

      GithubHelper.requestPaginator.mockResolvedValueOnce(response)

      const repositories = await GithubService.getTotalRepositories({ ...testProps })

      expect(repositories).toEqual({
        index: testProps.index,
        totalRepositories: response.data.length
      })
    })

    it('getTotalRepositories() should fail and throw', async () => {
      const testProps = {
        userId: 1,
        index: 0
      }

      const response = {
        status: 500
      }

      GithubHelper.requestPaginator.mockRejectedValue(response)

      expect(
        GithubService.getTotalRepositories({ ...testProps })
      ).rejects.toEqual(new Error(ERRORS.REPOSITORIES.MESSAGE))
    })

    it('getTotalRepositories() should return response when no userId is given', async () => {
      const response = await GithubService.getTotalRepositories({ index: 0, userId: null })

      expect(response).toEqual({
        totalRepositories: 0,
        index: 0
      })
    })
  })

  describe('getTotalStars cases', () => {
    it('getTotalStars() should succeed and return proper formatted response', async () => {
      const testProps = {
        userId: 1,
        index: 0
      }

      const response = {
        status: 200,
        data: [
          { id: 2 },
          { id: 1 }
        ]
      }

      GithubHelper.requestPaginator.mockResolvedValueOnce(response)

      const repositories = await GithubService.getTotalStars({ ...testProps })

      expect(repositories).toEqual({
        index: testProps.index,
        totalStars: response.data.length
      })
    })

    it('getTotalStars() should fail and throw', async () => {
      const testProps = {
        userId: 1,
        index: 0
      }

      const response = {
        status: 500
      }

      GithubHelper.requestPaginator.mockRejectedValue(response)

      expect(
        GithubService.getTotalRepositories({ ...testProps })
      ).rejects.toEqual(new Error(ERRORS.REPOSITORIES.MESSAGE))
    })

    it('getTotalStars() should return response when no userId is given', async () => {
      const response = await GithubService.getTotalStars({ index: 0, userId: null })

      expect(response).toEqual({
        totalStars: 0,
        index: 0
      })
    })
  })
})
