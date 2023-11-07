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
import { securityEn, securityNp } from '@/core/private/Security/translations'
import standingListEn from '@/core/private/StandingList/translations/en.json'
import standingListNp from '@/core/private/StandingList/translations/np.json'
import registrationBookEn from '@/core/private/RegistrationBook/translations/en.json'
import registrationBookNp from '@/core/private/RegistrationBook/translations/np.json'
import dispatchBookEn from '@/core/private/DispatchBook/translations/en.json'
import dispatchBookNp from '@/core/private/DispatchBook/translations/np.json'
import { publicEn, publicNp } from '@/core/public/translations'

export const resources = {
  en: {
    translation: {
      ...commonEn,
      sidebar: sidebarEn,
      masterSetup: masterSetupEn,
      security: securityEn,
      standingList: standingListEn,
      registrationBook: registrationBookEn,
      dispatchBook: dispatchBookEn,
      public: publicEn,
    },
  },

  ne: {
    translation: {
      ...commonNp,
      sidebar: sidebarNp,
      masterSetup: masterSetupNp,
      security: securityNp,
      standingList: standingListNp,
      registrationBook: registrationBookNp,
      dispatchBook: dispatchBookNp,
      public: publicNp,
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
