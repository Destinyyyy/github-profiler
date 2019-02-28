import React from 'react'
import fr from 'react-intl/locale-data/fr'
import flatten from 'flat'
import { isUndefined, first, split, get } from 'lodash'
import { addLocaleData, IntlProvider } from 'react-intl'

import frMessages from './locales/fr.json'

addLocaleData([...fr])

const getLang = () => {
  if (!isUndefined(navigator.languages)) {
    return first(navigator.languages)
  }

  return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'fr'
}

const locale = first(split(getLang(), /[-_]/))
const messages = { fr: flatten(frMessages) }

function TranslationProvider ({ children }) {
  return (
    <IntlProvider
      locale={locale}
      messages={get(messages, locale, messages.fr)}
    >
      {children}
    </IntlProvider>
  )
}

export default TranslationProvider
