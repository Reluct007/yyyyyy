import { en } from "@/locales/en";
import { es } from "@/locales/es";
import { fr } from "@/locales/fr";
import { de } from "@/locales/de";
import { ja } from "@/locales/ja";
import { ko } from "@/locales/ko";
import {
  DEFAULT_LOCALE as DEFAULT_LOCALE_CONST,
  NON_DEFAULT_LOCALES,
  SUPPORTED_LOCALES,
} from "@/data/i18n";

const translations = {
  en,
  es,
  fr,
  de,
  ja,
  ko,
};

export const DEFAULT_LOCALE = DEFAULT_LOCALE_CONST;

export function getTranslations(locale = "en") {
  return translations[locale] || translations.en;
}

export function getSupportedLocales() {
  return SUPPORTED_LOCALES;
}

export function getNonDefaultLocales() {
  return NON_DEFAULT_LOCALES;
}

export function getLocaleDisplayName(locale) {
  const names = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    ja: "日本語",
    ko: "한국어",
  };
  return names[locale] || "English";
}
