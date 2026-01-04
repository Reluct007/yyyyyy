import { en } from '@/locales/en';
import { es } from '@/locales/es';
import { fr } from '@/locales/fr';
import { de } from '@/locales/de';
import { ja } from '@/locales/ja';
import { ko } from '@/locales/ko';

const translations = {
  en,
  es,
  fr,
  de,
  ja,
  ko
};

export const DEFAULT_LOCALE = 'en';

export function getTranslations(locale = 'en') {
  return translations[locale] || translations.en;
}

export function getSupportedLocales() {
  return Object.keys(translations);
}

export function getNonDefaultLocales() {
  return getSupportedLocales().filter((locale) => locale !== DEFAULT_LOCALE);
}

export function getLocaleDisplayName(locale) {
  const names = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    ja: '日本語',
    ko: '한국어'
  };
  return names[locale] || 'English';
}
