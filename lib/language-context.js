"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_LOCALE, getTranslations, getSupportedLocales } from "@/lib/i18n";

const LanguageContext = createContext(null);
const SUPPORTED_LOCALES = getSupportedLocales();

export function LanguageProvider({ children, initialLocale }) {
  const resolvedInitialLocale = SUPPORTED_LOCALES.includes(initialLocale)
    ? initialLocale
    : DEFAULT_LOCALE;
  const [locale, setLocale] = useState(resolvedInitialLocale);
  const [translations, setTranslations] = useState(() => getTranslations(resolvedInitialLocale));

  useEffect(() => {
    // Extract locale from pathname on client-side only
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);
    const pathLocale = pathSegments[0];

    if (SUPPORTED_LOCALES.includes(pathLocale)) {
      setLocale(pathLocale);
      setTranslations(getTranslations(pathLocale));
    } else {
      // Default to English for root path and other paths without locale
      setLocale(DEFAULT_LOCALE);
      setTranslations(getTranslations(DEFAULT_LOCALE));
    }
  }, []);

  const changeLanguage = (newLocale) => {
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);

    // Remove current locale from path if it exists
    if (SUPPORTED_LOCALES.includes(pathSegments[0])) {
      pathSegments.shift();
    }

    // Add new locale to path (only if not default)
    const suffix = pathSegments.length > 0 ? `/${pathSegments.join("/")}/` : "/";
    const newPath = newLocale === DEFAULT_LOCALE ? suffix : `/${newLocale}${suffix}`;

    setLocale(newLocale);
    setTranslations(getTranslations(newLocale));
    window.location.href = newPath;
  };

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
      locale: DEFAULT_LOCALE,
      translations: getTranslations(DEFAULT_LOCALE),
      changeLanguage: () => { }
    };
  }
  return context;
}
