function normalizeSiteUrl(siteUrl) {
  if (typeof siteUrl !== "string") {
    throw new TypeError("siteUrl must be a string");
  }
  const trimmed = siteUrl.trim();
  if (!trimmed) {
    throw new Error("siteUrl is required");
  }
  return trimmed.replace(/\/+$/, "");
}

function normalizeLogicalPath(logicalPath) {
  if (typeof logicalPath !== "string") {
    throw new TypeError("logicalPath must be a string");
  }
  const trimmed = logicalPath.trim();
  if (!trimmed) {
    throw new Error("logicalPath is required");
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function localizedPath({ logicalPath, locale, defaultLocale }) {
  const normalizedLogicalPath = normalizeLogicalPath(logicalPath);
  if (!locale || locale === defaultLocale) return normalizedLogicalPath;
  return `/${locale}${normalizedLogicalPath}`;
}

export function toLocalizedUrl({
  siteUrl,
  logicalPath,
  locale,
  defaultLocale = "en",
}) {
  const base = normalizeSiteUrl(siteUrl);
  const pathname = localizedPath({ logicalPath, locale, defaultLocale });
  return new URL(pathname, `${base}/`).toString();
}

export function buildAlternates({
  siteUrl,
  logicalPath,
  locale,
  locales,
  defaultLocale = "en",
  availableLocales,
  includeXDefault = true,
}) {
  const currentLocale = locale || defaultLocale;
  const allLocales = Array.isArray(locales) ? locales : [];
  const enabledLocales = Array.isArray(availableLocales)
    ? availableLocales
    : allLocales;

  const canonical = toLocalizedUrl({
    siteUrl,
    logicalPath,
    locale: currentLocale,
    defaultLocale,
  });

  const languages = {};
  enabledLocales.forEach((lang) => {
    languages[lang] = toLocalizedUrl({
      siteUrl,
      logicalPath,
      locale: lang,
      defaultLocale,
    });
  });

  if (includeXDefault) {
    languages["x-default"] = toLocalizedUrl({
      siteUrl,
      logicalPath,
      locale: defaultLocale,
      defaultLocale,
    });
  }

  return { canonical, languages };
}

