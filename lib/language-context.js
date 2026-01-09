"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_LOCALE, getTranslations, getSupportedLocales } from "@/lib/i18n";

const LanguageContext = createContext();
const SUPPORTED_LOCALES = getSupportedLocales();

export function LanguageProvider({ children, initialLocale }) {
  const resolvedInitialLocale = SUPPORTED_LOCALES.includes(initialLocale)
    ? initialLocale
    : DEFAULT_LOCALE;
  const [locale, setLocale] = useState(resolvedInitialLocale);
  const [translations, setTranslations] = useState(() => getTranslations(resolvedInitialLocale));
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Extract locale from pathname
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
  }, [pathname]);

  const changeLanguage = (newLocale) => {
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
    router.push(newPath);
  };

  return (
    <LanguageContext.Provider value={{ locale, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
