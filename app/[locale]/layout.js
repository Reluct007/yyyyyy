import { LanguageProvider } from '@/lib/language-context';
import { getSupportedLocales } from '@/lib/i18n';
import { getSeoMeta } from '@/lib/metadata-translations';
import { notFound } from 'next/navigation';

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
    ? 'https://www.labubuwholesale.com' 
    : `https://www.labubuwholesale.com/${locale}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.labubuwholesale.com',
        'es': 'https://www.labubuwholesale.com/es',
        'fr': 'https://www.labubuwholesale.com/fr',
        'de': 'https://www.labubuwholesale.com/de',
        'ja': 'https://www.labubuwholesale.com/ja',
        'ko': 'https://www.labubuwholesale.com/ko',
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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
