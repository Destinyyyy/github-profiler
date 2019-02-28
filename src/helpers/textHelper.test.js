import { getFormattedUsername } from './textHelper'

describe('textHelper tests', () => {
  it('getFormattedUsername should return a proper formatted object given a search input and username', () => {
    const text = 'garde'
    const username = 'gaearon'

    const result = getFormattedUsername({
      text,
      username
    })

    expect(result).toEqual({
      highlightedPart: 'ga',
      remainingPart: 'earon'
    })
  })

  it('getFormattedUsername should handle empty search input but valid username', () => {
    const result = getFormattedUsername({
      text: '',
      username: 'gaearon'
    })

    expect(result).toEqual({
      highlightedPart: '',
      remainingPart: 'gaearon'
    })
  })

  it('getFormattedUsername should handle empty search input and empty username', () => {
    expect(getFormattedUsername({})).toEqual({
      highlightedPart: '',
      remainingPart: ''
    })
  })
})
