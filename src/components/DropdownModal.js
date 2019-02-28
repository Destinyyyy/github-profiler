import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import { FILTERS } from '../config/filters'

function DropdownModal ({ isOpened, updateSortType }) {
  return isOpened ? (
    <ul className='dropdown-modal'>
      <li
        className='dropdown-modal__element'
        onClick={() => updateSortType(FILTERS.REPOSITORIES)}
      >
        <FormattedMessage id={'SORTING.TOTAL_REPOSITORIES'} />
      </li>

      <li
        className='dropdown-modal__element'
        onClick={() => updateSortType(FILTERS.FOLLOWERS)}
      >
        <FormattedMessage id={'SORTING.TOTAL_FOLLOWERS'} />
      </li>

      <li
        className='dropdown-modal__element'
        onClick={() => updateSortType(FILTERS.SCORE)}
      >
        <FormattedMessage id={'SORTING.TOTAL_SCORE'} />
      </li>
    </ul>
  ) : null
}

DropdownModal.propTypes = {
  isOpened: PropTypes.bool,
  updateSortType: PropTypes.func
}

DropdownModal.defaultProps = {
  isOpened: false,
  updateSortType: () => {}
}

export default DropdownModal
