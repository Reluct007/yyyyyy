// 这个文件保留用于向后兼容，但建议使用 Next.js metadata API
// 在页面组件中使用 export const metadata = { ... } 来设置 SEO 信息

import { basic } from "@/data/basic";

const DEFAULT_TITLE = basic.seo.title;
const DEFAULT_DESCRIPTION = basic.seo.description;

export function generateMetadata({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType = "website",
  twitterTitle,
  twitterDescription,
  twitterImage,
}) {
  const metadata = {
    title: title || DEFAULT_TITLE,
    description: description || DEFAULT_DESCRIPTION,
    alternates: {},
    openGraph: {
      title: ogTitle || title || DEFAULT_TITLE,
      description: ogDescription || description || DEFAULT_DESCRIPTION,
      url: ogUrl || canonical || basic.seo.url,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: ogType,
      siteName: basic.info.brand,
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle || ogTitle || title || DEFAULT_TITLE,
      description: twitterDescription || ogDescription || description || DEFAULT_DESCRIPTION,
      images: twitterImage ? [twitterImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  // 添加 canonical URL
  if (canonical) {
    metadata.alternates.canonical = canonical;
  }

  return metadata;
}
