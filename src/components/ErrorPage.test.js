import React from 'react'
import { shallow } from 'enzyme'

import ErrorPage from './ErrorPage'
import CustomButton from './CustomButton'
import { ERROR_TYPES } from '../config/errors'

describe('ErrorPage component test', () => {
  let errorPageWrapper
  let buttonWrapper

  let testProps = {
    errorType: null,
    callback: jest.fn()
  }

  beforeEach(() => {
    buttonWrapper = shallow(<CustomButton callback={testProps.callback} messageKey={'test'} />)
  })

  afterEach(() => {
    errorPageWrapper.unmount()
    buttonWrapper.unmount()
  })

  it('should render internal error and button', () => {
    testProps.errorType = ERROR_TYPES.INTERNAL_ERROR.TYPE

    errorPageWrapper = shallow(
      <ErrorPage {...testProps} />
    )

    expect(errorPageWrapper.find(CustomButton).length).toBe(1)
  })

  it('should render interal error and callback should be called when clicking the button', () => {
    testProps.errorType = ERROR_TYPES.INTERNAL_ERROR.TYPE

    buttonWrapper.find('button').simulate('click')

    expect(testProps.callback).toHaveBeenCalledTimes(1)
  })

  it('should render no results error with no button', () => {
    testProps.errorType = ERROR_TYPES.NO_RESULTS.TYPE

    errorPageWrapper = shallow(
      <ErrorPage {...testProps} />
    )

    expect(errorPageWrapper.find(CustomButton).length).toBe(0)
  })
})
