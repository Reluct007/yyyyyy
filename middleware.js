import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get('host') || '';

  // Redirect non-www to www
  if (host === 'labubuwholesale.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.labubuwholesale.com';
    return NextResponse.redirect(url, 301);
  }

  // Handle /about redirect (if accessed without locale)
  if (pathname === '/about') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Handle /product without slug - redirect to products page
  if (pathname === '/product' || pathname === '/product/') {
    return NextResponse.redirect(new URL('/products', request.url), 301);
  }

  // Handle invalid product URLs (Amazon-style filenames, numbers only, etc.)
  if (pathname.startsWith('/product/')) {
    const slug = pathname.split('/product/')[1];
    const invalidPatterns = [
      /SS40_BG85/,
      /_SX38_SY50_CR/,
      /\.SX38_SY50_CR/,
      /_BR-120_PKdp-play-icon-overlay__/,
      /^\d+$/,  // Just numbers
    ];
    
    const isInvalid = invalidPatterns.some(pattern => pattern.test(slug));
    if (isInvalid || !slug || slug.length < 3) {
      return NextResponse.redirect(new URL('/products', request.url), 301);
    }
  }

  // Handle blog URLs - redirect to home since blog doesn't exist
  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  // Handle localized invalid URLs
  const localePattern = /^\/(en|fr|es|de|ja|ko|zh)\//;
  if (localePattern.test(pathname)) {
    const pathWithoutLocale = pathname.replace(localePattern, '/');
    
    // Redirect invalid localized product URLs
    if (pathWithoutLocale.startsWith('/product/')) {
      const slug = pathWithoutLocale.split('/product/')[1];
      const invalidPatterns = [
        /SS40_BG85/,
        /_SX38_SY50_CR/,
        /^\d+$/,
      ];
      
      const isInvalid = invalidPatterns.some(pattern => pattern.test(slug));
      if (isInvalid || !slug || slug.length < 3) {
        const locale = pathname.match(localePattern)[1];
        return NextResponse.redirect(new URL(`/${locale}/products`, request.url), 301);
      }
    }
    
    // Redirect localized blog URLs
    if (pathWithoutLocale === '/blog' || pathWithoutLocale.startsWith('/blog/')) {
      const locale = pathname.match(localePattern)[1];
      return NextResponse.redirect(new URL(`/${locale}`, request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp).*)',
  ],
};
