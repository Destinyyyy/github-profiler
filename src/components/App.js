import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'

import * as GithubService from '../services/githubService'
import { INPUT_DEBOUNCE } from '../config/settings'
import Card from './Card'
import SearchBar from './SearchBar'
import SortingAction from './SortingAction'
import Loader from './Loader'
import ErrorPage from './ErrorPage'

import { FILTERS } from '../config/filters'
import { getFormattedUsername } from '../helpers/textHelper'

function App () {
  const [text, updateText] = useState('')
  const [sortType, updateSortType] = useState(FILTERS.SCORE)
  const [users, updateUsers] = useState([])
  const [error, updateError] = useState({ error: { TYPE: null } })
  const [loading, updateLoading] = useState(false)

  useEffect(() => {
    updateLoading(true)

    GithubService.getUsers({ text, sortType })
      .then(({ users, error }) => {
        if (error) {
          updateError(error)
          updateUsers([])
          return
        }

        updateError({ error: { TYPE: null } })
        updateUsers(users)
      }).then(() => updateLoading(false))
  }, [text, sortType])

  const DISPLAY_SERVER_ERROR = error.TYPE
  const DISPLAY_NO_RESULTS_FOUND = users.length <= 0 && !loading && text.length > 0

  return (
    <div id='app'>
      <h1>{process.env.REACT_APP_GITHUB_TOKEN}</h1>
      <SearchBar onChange={debounce(updateText, INPUT_DEBOUNCE)} />
      <SortingAction updateSortType={updateSortType} />
      <Loader loading={loading} />

      {
        (DISPLAY_SERVER_ERROR || DISPLAY_NO_RESULTS_FOUND) && (
          <ErrorPage
            errorType={error.TYPE || null}
            callback={() => GithubService.getUsers({ text, sortType })}
          />
        )
      }

      <div className='list-card'>
        {
          !loading && users.map((user) => {
            const { login: username } = user

            return (
              <Card
                {...user}
                key={user.id}
                formattedUsername={getFormattedUsername({ text, username })}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default App
