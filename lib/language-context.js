'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DEFAULT_LOCALE, getTranslations, getSupportedLocales } from '@/lib/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [translations, setTranslations] = useState(getTranslations(DEFAULT_LOCALE));
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Extract locale from pathname
    const pathSegments = pathname.split('/').filter(Boolean);
    const pathLocale = pathSegments[0];
    const supportedLocales = getSupportedLocales();
    
    if (supportedLocales.includes(pathLocale)) {
      setLocale(pathLocale);
      setTranslations(getTranslations(pathLocale));
    } else {
      // Default to English for root path and other paths without locale
      setLocale(DEFAULT_LOCALE);
      setTranslations(getTranslations(DEFAULT_LOCALE));
    }
  }, [pathname]);

  const changeLanguage = (newLocale) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const supportedLocales = getSupportedLocales();
    
    // Remove current locale from path if it exists
    if (supportedLocales.includes(pathSegments[0])) {
      pathSegments.shift();
    }
    
    // Add new locale to path (default locale uses root path, no prefix)
    const suffix = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '';
    const newPath = newLocale === DEFAULT_LOCALE ? `${suffix || '/'}` : `/${newLocale}${suffix}`;
    
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
