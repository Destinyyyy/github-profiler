import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import CustomButton from './CustomButton'
import { ERROR_TYPES } from '../config/errors'

function ErrorPage ({ errorType, callback }) {
  let imageClass = 'error-page__no-results-image'

  let messageKey = errorType === ERROR_TYPES.INTERNAL_ERROR.TYPE
    ? ERROR_TYPES.INTERNAL_ERROR.MESSAGE_KEY
    : ERROR_TYPES.NO_RESULTS.MESSAGE_KEY

  if (errorType === ERROR_TYPES.INTERNAL_ERROR.TYPE) {
    imageClass = 'error-page__internal-error-image'
  }

  return (
    <div className='error-page'>
      <div className={imageClass} />

      <div className='error-page__message'>
        <FormattedMessage id={messageKey} />
      </div>

      {
        errorType === ERROR_TYPES.INTERNAL_ERROR.TYPE && (
          <div className='error-page__button'>
            <CustomButton
              callback={callback}
              messageKey={'COMMON.REFRESH'}
            />
          </div>
        )
      }
    </div>
  )
}

ErrorPage.propTypes = {
  errorType: PropTypes.string,
  callback: PropTypes.func
}

ErrorPage.defaultProps = {
  callback: () => {},
  errorType: ''
}

export default ErrorPage
