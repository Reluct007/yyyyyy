'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getTranslations, getSupportedLocales } from '@/lib/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en');
  const [translations, setTranslations] = useState(getTranslations('en'));
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
      setLocale('en');
      setTranslations(getTranslations('en'));
    }
  }, [pathname]);

  const changeLanguage = (newLocale) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const supportedLocales = getSupportedLocales();
    
    // Remove current locale from path if it exists
    if (supportedLocales.includes(pathSegments[0])) {
      pathSegments.shift();
    }
    
    // Add new locale to path
    const newPath = `/${newLocale}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
    
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
