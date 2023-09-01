import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import englishLang from "./en.json";
import nepaliLang from "./np.json";

const langKey = "lang";
const resources = {
  en: {
    translation: englishLang,
  },
  np: {
    translation: nepaliLang,
  },
};
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: `${localStorage.getItem(langKey) ? localStorage.getItem(langKey) : "np"
      }`,
  });

export const switchLanguage = (lang?: "en" | "np") => {
  const currentLanguage = i18n.language;
  // eslint-disable-next-line no-console
  console.log(i18n.language, "Language");
  if (lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem(langKey, lang);
  } else {
    i18n.changeLanguage(currentLanguage === "en" ? "np" : "en");
    localStorage.setItem(langKey, currentLanguage === "en" ? "np" : "en");
  }
};


export const getTextByLanguage = (nameEn: string, nameNp: string) => {
  switch (i18n.language) {
    case "np":
      return nameNp;
    default:
      return nameEn
  }
}
