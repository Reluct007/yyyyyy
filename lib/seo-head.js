// 这个文件保留用于向后兼容，但建议使用 Next.js metadata API
// 在页面组件中使用 export const metadata = { ... } 来设置 SEO 信息

export function generateMetadata({ 
  title, 
  description, 
  canonical, 
  ogTitle, 
  ogDescription, 
  ogUrl, 
  ogImage, 
  ogType = 'website',
  twitterTitle,
  twitterDescription,
  twitterImage 
}) {
  const metadata = {
    title: title || 'Labubu Wholesale - Premium Designer Collectibles & Custom Toys',
    description: description || 'Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles. Quality guaranteed.',
    alternates: {},
    openGraph: {
      title: ogTitle || title || 'Labubu Wholesale - Premium Designer Collectibles & Custom Toys',
      description: ogDescription || description || 'Premium Labubu wholesale collectibles for distributors & retailers.',
      url: ogUrl || canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle || ogTitle || title,
      description: twitterDescription || ogDescription || description,
      images: twitterImage ? [twitterImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  // 添加 canonical URL
  if (canonical) {
    metadata.alternates.canonical = canonical;
  }

  return metadata;
}
