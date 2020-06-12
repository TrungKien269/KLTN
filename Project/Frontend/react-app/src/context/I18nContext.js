import React, { useState, createContext, useMemo } from "react";
import vnData from '../data/vn/translation.json';
import enData from '../data/en/translation.json';

const translations = {
  vn: vnData,
  en: enData
};

export const I18nContext = createContext({
  currentLanguage: "",
  changeLanguage: () => { },
  t: () => { }
});

function I18nProvider(props) {
  const [currentLanguage, setLanguage] = useState("en");

  const currentLanguageTranslations = useMemo(
    () => translations[currentLanguage],
    [currentLanguage]
  );

  const i18n = {
    changeLanguage: async(language) => await setLanguage(language),
    currentLanguage,
    t: key => currentLanguageTranslations[key]
  };

  return <I18nContext.Provider value={i18n} {...props} />;
}

export default I18nProvider;