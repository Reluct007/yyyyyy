import { LanguageProvider } from '@/lib/language-context';
import { getSupportedLocales } from '@/lib/i18n';
import { getSeoMeta } from '@/lib/metadata-translations';
import { notFound } from 'next/navigation';

const ROOT_URL = "https://www.labubuwholesale.com";

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale: locale,
  }));
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  const { title, description } = getSeoMeta('home', locale);
  
  const localeMap = {
    'en': 'en_US',
    'es': 'es_ES',
    'fr': 'fr_FR',
    'de': 'de_DE',
    'ja': 'ja_JP',
    'ko': 'ko_KR',
  };

  const canonicalUrl = locale === 'en' 
    ? ROOT_URL 
    : `${ROOT_URL}/${locale}`;
  
  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': ROOT_URL,
        'es': `${ROOT_URL}/es`,
        'fr': `${ROOT_URL}/fr`,
        'de': `${ROOT_URL}/de`,
        'ja': `${ROOT_URL}/ja`,
        'ko': `${ROOT_URL}/ko`,
        'x-default': ROOT_URL,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Labubu Wholesale",
      locale: localeMap[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'Labubu Wholesale - Premium Designer Collectibles',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  const supportedLocales = getSupportedLocales();
  
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
