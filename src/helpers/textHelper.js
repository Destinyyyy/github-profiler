import { isEmpty } from 'lodash'

/**
 * getFormattedUsername
 * @summary Return a formatted object containing highlighted parts and remaining parts given an input
 * @param {Object} obj - An object.
 * @param {string} obj.text - text input
 * @param {string} obj.username - username against which we will extract the matching part and remaining part
 * @returns {Object}
 */
export function getFormattedUsername ({ text, username }) {
  if (isEmpty(text) && isEmpty(username)) {
    return {
      highlightedPart: '',
      remainingPart: ''
    }
  }

  let formattedUsername = {
    highlightedPart: '',
    remainingPart: ''
  }

  let explodedText = text.split('')
  let explodedUsername = username.split('')

  if (explodedText.length <= 0) {
    formattedUsername = {
      highlightedPart: '',
      remainingPart: username
    }
  }

  for (let i = 0; i < explodedUsername.length; i++) {
    if (explodedText[i] === explodedUsername[i]) {
      formattedUsername.highlightedPart += text[i]
    } else {
      formattedUsername.remainingPart = username.substr(i)
      break
    }
  }

  return formattedUsername
}
