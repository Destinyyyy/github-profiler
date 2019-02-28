import React from 'react'
import { shallow } from 'enzyme'

import CustomButton from './CustomButton'

describe('CustomButton component tests', () => {
  let wrapper

  let testProps = {
    messageKey: 'test',
    callback: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<CustomButton {...testProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render the button and invoke callback when clicked upon', () => {
    let button = wrapper.find('button')

    expect(button.length).toBe(1)

    button.simulate('click')

    expect(testProps.callback).toHaveBeenCalledTimes(1)
  })

  it('should not render the button if no messageKey is specified', () => {
    testProps.messageKey = ''

    wrapper = shallow(<CustomButton {...testProps} />)

    expect(wrapper.find('button').length).toBe(0)
  })
})
