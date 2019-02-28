import React from 'react'
import { mount } from 'enzyme'
import TranslationProvider from '../translationProvider'
import Card from './Card'

describe('Card component tests', () => {
  let wrapper

  let testProps = {
    avatar_url: 'avatar-url',
    formattedUsername: {
      highlightedPart: 'Dest',
      remainingPart: 'inyyyy'
    },
    html_url: 'profile-url',
    totalStars: 300,
    followers: [{ id: 'id-1', avatar_url: 'follower-1-url' }],
    totalRepositories: 10
  }

  beforeEach(() => {
    wrapper = mount(
      <TranslationProvider>
        <Card {...testProps} />
      </TranslationProvider>
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should contain properly formatted name', () => {
    expect(wrapper.find('.card__highlighted-part').at(0).text())
      .toBe(testProps.formattedUsername.highlightedPart)

    expect(wrapper.find('.card__remaining-part').at(0).text())
      .toBe(testProps.formattedUsername.remainingPart)
  })

  it('should contain profile name and a link to his github profile', () => {
    // Profile link should be on the name
    expect(wrapper.find('.card__profile-name a').at(0).prop('href')).toBe(testProps.html_url)
  })

  it('should render profile picture', () => {
    // Profile image visible
    expect(wrapper.find('.card__picture img').prop('src')).toBe(testProps.avatar_url)
  })

  it('should render the correct number of stars', () => {
    // Correct text for number of stars
    expect(wrapper.find('.card__profile-star-number').text()).toBe(
      Intl.NumberFormat('fr-FR').format(testProps.totalStars.toFixed(1))
    )
  })

  it('should render the correct number of total repositories', () => {
    // Correct text for number of repositories
    expect(wrapper.find('.card__profile-repositories').text()).toContain(
      testProps.totalRepositories
    )
  })

  it('should render followers properly', () => {
    // Correct number of followers blocks
    expect(wrapper.find('.card__profile-follower').length).toBe(testProps.followers.length)

    // Followers with their pictures
    testProps.followers.forEach((follower, index) => {
      expect(wrapper.find('.card__profile-follower img').prop('src')).toBe(follower.avatar_url)
    })
  })
})
