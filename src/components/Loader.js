import React from 'react'
import PropTypes from 'prop-types'

function Loader ({ loading }) {
  return loading && (
    <div className='loader'>
          Loading...
    </div>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool
}

Loader.defaultProps = {
  loading: false
}

export default Loader
