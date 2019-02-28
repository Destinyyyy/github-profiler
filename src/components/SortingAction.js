import React, { useState } from 'react'
import PropTypes from 'prop-types'

import DropdownModal from './DropdownModal'

function SortingAction ({ updateSortType }) {
  const [isOpened, toggleIsOpened] = useState(false)

  return (
    <div className='sorting-container' onClick={() => toggleIsOpened(!isOpened)}>
      <span className='sorting__text'>Trier par</span>

      { isOpened && <span>▼</span> }
      { !isOpened && <span>▲</span> }

      <DropdownModal
        isOpened={isOpened}
        updateSortType={updateSortType}
      />
    </div>
  )
}

SortingAction.propTypes = {
  updateSortType: PropTypes.func
}

SortingAction.defaultProps = {
  updateSortType: () => {}
}
export default SortingAction
