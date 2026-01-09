"use client";

import { createContext, useContext, useState } from "react";
import { DEFAULT_LOCALE, getTranslations } from "@/lib/i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLocale }) {
  // Always use English
  const [locale] = useState('en');
  const [translations] = useState(() => getTranslations('en'));

  // No-op function for compatibility
  const changeLanguage = () => { };

  return (
    <LanguageContext.Provider value={{ locale, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  // Return default values if context is not available (e.g., during SSR)
  if (!context) {
    return {
      locale: 'en',
      translations: getTranslations('en'),
      changeLanguage: () => { }
    };
  }
  return context;
}
