export const ERRORS = {
  SEARCH: {
    TYPE: 'SEARCH',
    MESSAGE: 'Error while executing a search'
  },
  REPOSITORIES: {
    TYPE: 'REPOSITORIES',
    MESSAGE: 'Error while fetching repositories associated to a user'
  },
  STARS: {
    TYPE: 'STARS',
    MESSAGE: 'Error while fetching stars associated to a user'
  },
  PAGINATED_REQUESTS: {
    TYPE: 'PAGINATED_REQUESTS',
    MESSAGE: 'Error while retrieving elements from paginated endpoint'
  }
}

// Map error types to key from translation file
export const ERROR_TYPES = {
  INTERNAL_ERROR: {
    MESSAGE_KEY: 'ERROR.SERVER_ERROR',
    TYPE: 'INTERNAL_ERROR'
  },
  NO_RESULTS: {
    MESSAGE_KEY: 'ERROR.NO_RESULTS',
    TYPE: 'NO_RESULTS'
  }
}
