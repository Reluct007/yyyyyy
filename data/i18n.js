export const DEFAULT_LOCALE = "en";

export const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "ja", "ko"];

export const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE
);

