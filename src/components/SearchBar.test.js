import React from 'react'
import { mount } from 'enzyme'
import SearchBar from './SearchBar'

describe('SearchBar component tests', () => {
  let wrapper

  let testProps = {
    onChange: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(
      <SearchBar {...testProps} />
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should trigger callback whenever input is changed', () => {
    let input = wrapper.find('.search-bar__input')

    input.instance().value = 'test'
    input.simulate('change')

    expect(testProps.onChange).toBeCalledWith('test')

    input.instance().value = ''
    input.simulate('change')

    expect(testProps.onChange).toBeCalledWith('')
  })
})
