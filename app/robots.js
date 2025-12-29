export default function robots() {
  const ROOT_URL = process.env.ROOT_URL || 'https://www.labubuwholesale.com';
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/product/*SS40_BG85*",
          "/product/*_SX38_SY50_CR*",
          "/product/*_BR-120_PKdp-play-icon-overlay__*",
          "/cdn-cgi/*",
        ],
      },
    ],
    sitemap: `${ROOT_URL}/sitemap.xml`,
  };
}
  