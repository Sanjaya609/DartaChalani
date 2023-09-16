import i18n from 'i18next'

import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import commonEn from './translations/common/en.json'
import commonNp from './translations/common/np.json'
import sidebarEn from './translations/sidebar/en.json'
import sidebarNp from './translations/sidebar/np.json'
import {
  masterSetupEn,
  masterSetupNp,
} from '@/core/private/MasterSetup/translations'

export const resources = {
  en: {
    translation: {
      ...commonEn,
      sidebar: sidebarEn,
      masterSetup: masterSetupEn,
    },
  },

  ne: {
    translation: {
      ...commonNp,
      sidebar: sidebarNp,
      masterSetup: masterSetupNp,
    },
  },
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({ resources, lng: localStorage.getItem('i18nextLng') ?? 'ne' })

const switchLocalStorageLng = (lang?: 'en' | 'ne') => {
  localStorage.setItem('i18nextLng', lang ?? 'ne')
}

export const switchLanguage = (lang?: 'en' | 'ne') => {
  const currentLanguage = i18n.language
  if (lang) {
    i18n.changeLanguage(lang)
    switchLocalStorageLng(lang)
  } else {
    i18n.changeLanguage(currentLanguage === 'en' ? 'ne' : 'en')
    switchLocalStorageLng(currentLanguage === 'en' ? 'ne' : 'en')
  }
}
/**
 * Returns data in selected language
 * @param dataEn any data containing english language
 * @param dataNe any data containing nepali language
 */
export const getTextByLanguage = (nameEnglish: string, nameNepali: string) => {
  switch (i18n.language) {
    case 'ne':
      return nameNepali
    default:
      return nameEnglish
  }
}

export default i18n
