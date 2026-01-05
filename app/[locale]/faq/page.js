import { getSeoMeta } from "@/lib/metadata-translations";
import { getContent } from "@/data/content";
import { basic } from "@/data/basic";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/data/i18n";
import { buildAlternates } from "@/lib/hreflang";
import { openGraphImage, twitterMetadata } from "@/lib/shared-metadata";

const ROOT_URL = basic.seo.url.replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { locale } = params;
  const alternates = buildAlternates({
    siteUrl: ROOT_URL,
    logicalPath: "/faq/",
    locale,
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  });
  const { title, description } = getSeoMeta('faq', locale);
  
  return {
    title,
    description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      ...openGraphImage,
      title,
      description,
      url: alternates.canonical,
      type: "website",
    },
    twitter: {
      ...twitterMetadata,
      title,
      description,
    },
  };
}

export default function FAQPage({ params }) {
  const { locale } = params;
  const content = getContent('faq', locale);
  const faqItems = Array.from(
    content.content.matchAll(/<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gis)
  ).map((match) => ({
    question: match[1],
    answer: match[2],
  }));

  const stripTags = (html) =>
    String(html || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map((item) => ({
            "@type": "Question",
            "name": stripTags(item.question),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": stripTags(item.answer),
            },
          })),
        }
      : null;

  return (
    <div className="container mx-auto px-4 py-12">
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <h1 className="text-4xl font-bold mb-8">{content.title || 'Frequently Asked Questions'}</h1>
      <div className="prose max-w-4xl" dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
