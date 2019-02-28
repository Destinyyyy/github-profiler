import React from 'react'
import { mount } from 'enzyme'

import Loader from './Loader'

describe('SortingAction', () => {
  let wrapper

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render loader if there is any loading', () => {
    wrapper = mount(
      <Loader loading />
    )

    expect(wrapper.find('.loader').length).toBe(1)
  })

  it('should render nothing if there is not any loading', () => {
    wrapper = mount(
      <Loader loading={false} />
    )

    expect(wrapper.find('.loader').length).toBe(0)
  })
})
