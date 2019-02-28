import React from 'react'
import PropTypes from 'prop-types'

/**
 * SearchBar
 * @summary Stateless function that represents the search bar
 * @param {Object} obj - An object.
 * @param {string} obj.onChange - callback used whenever the search input changes
 */
function SearchBar ({ onChange }) {
  return (
    <div className='search-bar-container'>
      <label htmlFor='search-bar-input' className='search-bar__label' />
      <input
        type='text'
        className='search-bar__input'
        id='search-bar-input'
        placeholder='Search...'
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

SearchBar.propTypes = {
  onChange: PropTypes.func
}

SearchBar.defaultProps = {
  onChange: () => {}
}

export default SearchBar
