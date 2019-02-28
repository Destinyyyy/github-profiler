import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

function Button ({ messageKey, callback }) {
  return messageKey ? (
    <button className='custom-button' onClick={callback}>
      <FormattedMessage id={messageKey} />
    </button>
  ) : null
}

Button.propTypes = {
  messageKey: PropTypes.string.isRequired,
  callback: PropTypes.func
}

Button.defaultProps = {
  callback: () => {}
}

export default Button
