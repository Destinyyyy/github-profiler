const BASE_URL = 'https://api.github.com'

export const ENDPOINTS = {
  SEARCH: `${BASE_URL}/search/users`,
  USER: ({ userId }) => `${BASE_URL}/users/${userId}`,
  REPOSITORIES: ({ userId }) => `${BASE_URL}/users/${userId}/repos`,
  STARS: ({ userId }) => `${BASE_URL}/users/${userId}/starred`,
  FOLLOWERS: ({ userId }) => `${BASE_URL}/users/${userId}/followers`
}
