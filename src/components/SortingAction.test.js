import React from 'react'
import { mount } from 'enzyme'

import SortingAction from './SortingAction'
import DropdownModal from './DropdownModal'

describe('SortingAction', () => {
  const testProps = {
    updateSortType: jest.fn()
  }

  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <SortingAction {...testProps} />
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render with a title, message, and 1 confirmation button', () => {
    expect(wrapper.find(DropdownModal).length).toBe(1)
  })
})
