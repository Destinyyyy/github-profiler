import React from 'react'
import { shallow } from 'enzyme'

import DropdownModal from './DropdownModal'
import { FILTERS } from '../config/filters'

describe('DropdownModal component tests', () => {
  let wrapper
  let elementClass = '.dropdown-modal__element'

  let testProps = {
    isOpened: true,
    updateSortType: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<DropdownModal {...testProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render the three list elements', () => {
    expect(wrapper.find(elementClass).length).toBe(3)
  })

  it('should invoke callbacks given on all elements', () => {
    wrapper.find(elementClass).at(0).simulate('click')
    wrapper.find(elementClass).at(1).simulate('click')
    wrapper.find(elementClass).at(2).simulate('click')

    expect(testProps.updateSortType).toHaveBeenCalledTimes(3)
  })

  it('should invoke callbacks with correct parameter', () => {
    wrapper.find(elementClass).at(0).simulate('click')

    expect(testProps.updateSortType).toHaveBeenCalledWith(FILTERS.REPOSITORIES)

    wrapper.find(elementClass).at(1).simulate('click')
    expect(testProps.updateSortType).toHaveBeenCalledWith(FILTERS.FOLLOWERS)

    wrapper.find(elementClass).at(2).simulate('click')
    expect(testProps.updateSortType).toHaveBeenCalledWith(FILTERS.SCORE)
  })
})
