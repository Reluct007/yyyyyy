/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-kappa-one-58.vercel.app/api/:path*',
      },
    ];
  },
  async redirects() {
    return [
      // Terms redirect
      {
        source: '/terms-and-conditions',
        destination: '/terms-conditions',
        permanent: true,
      },
      // Email protection redirect
      {
        source: '/cdn-cgi/l/email-protection',
        destination: '/contact',
        permanent: true,
      },
      // Invalid product categories - redirect to main products page
      {
        source: '/products/blind-boxes',
        destination: '/products/labubu',
        permanent: true,
      },
      {
        source: '/products/plush-toys',
        destination: '/products/labubu',
        permanent: true,
      },
      {
        source: '/products/bags',
        destination: '/products',
        permanent: true,
      },
      // French category redirects
      {
        source: '/fr/products/poupees',
        destination: '/fr/products/dolls',
        permanent: true,
      },
      {
        source: '/fr/products/jouets-danimaux',
        destination: '/fr/products/animals-toy',
        permanent: true,
      },
      // Spanish category redirects
      {
        source: '/es/products/munecas',
        destination: '/es/products/dolls',
        permanent: true,
      },
      {
        source: '/es/products/juguetes-de-animales',
        destination: '/es/products/animals-toy',
        permanent: true,
      },
      // German category redirects
      {
        source: '/de/products/puppen',
        destination: '/de/products/dolls',
        permanent: true,
      },
      {
        source: '/de/products/tier-spielzeug',
        destination: '/de/products/animals-toy',
        permanent: true,
      },
      // Specific invalid product URLs from Google Search Console
      {
        source: '/product/the-goo-goo-dolls-live-in-buffalo-july-4th-2004-dvd',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/product/2-set-car-seat-for-10-17cm-dolls',
        destination: '/products/labubu',
        permanent: true,
      },
      {
        source: '/product/doll-clothes-compatible-with-labubu-2-set-outfits4-pieces',
        destination: '/products/labubu',
        permanent: true,
      },
      {
        source: '/product/clothes-for-labubu-dolls-cute-shark-outfit',
        destination: '/products/labubu',
        permanent: true,
      },
      {
        source: '/product/large-clear-figure-display-bag-with-keychain-case-6',
        destination: '/products/labubu',
        permanent: true,
      },
      {
        source: '/product/labubu-sketch-collection-figurine-138-inch-height',
        destination: '/products/labubu',
        permanent: true,
      },
      {
        source: '/product/glitter-girls-14-inch-fashion-doll',
        destination: '/products/dolls',
        permanent: true,
      },
      {
        source: '/product/11-soft-and-cuddly-baby-doll-realistic-features',
        destination: '/products/dolls',
        permanent: true,
      },
      // Blog redirects (for any that slip through middleware)
      {
        source: '/blog/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/rise-of-remote-work-culture',
        destination: '/',
        permanent: true,
      },
      {
        source: '/sustainable-living-eco-friendly-practices',
        destination: '/',
        permanent: true,
      },
      {
        source: '/impact-of-5g-technology',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cybersecurity-best-practices-businesses',
        destination: '/',
        permanent: true,
      },
      {
        source: '/artificial-intelligence-healthcare',
        destination: '/',
        permanent: true,
      },
      {
        source: '/digital-marketing-trends-2024',
        destination: '/',
        permanent: true,
      },
      {
        source: '/the-future-of-smart-home-technology',
        destination: '/',
        permanent: true,
      },
      {
        source: '/financial-planning-young-professionals',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
