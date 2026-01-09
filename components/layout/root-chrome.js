'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { LanguageProvider } from "@/lib/language-context";

// Lazy load components to prevent them from being evaluated during SSR
const Navbar = lazy(() => import("@/components/features/navbar"));
const Footer = lazy(() => import("@/components/features/footer"));
const ScrollToTop = lazy(() => import("@/components/features/scroll-to-top"));
const ToasterWrapper = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));

// 统一站点外壳：避免在多个 Root Layout 中重复 Navbar/Footer/Provider 结构
export default function RootChrome({ children, locale }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAdminPath, setIsAdminPath] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check pathname on client-side only
    if (typeof window !== 'undefined') {
      setIsAdminPath(window.location.pathname.startsWith('/admin'));
    }
  }, []);

  // During SSR/static export, render only children without Navbar/Footer
  // This prevents Radix UI components from being evaluated during prerendering
  if (!isMounted) {
    return (
      <LanguageProvider initialLocale={locale}>
        <main>{children}</main>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider initialLocale={locale}>
      <Suspense fallback={null}>
        {!isAdminPath && <Navbar />}
      </Suspense>
      <main>{children}</main>
      <Suspense fallback={null}>
        {!isAdminPath && <Footer />}
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Suspense fallback={null}>
        <ToasterWrapper richColors position="top-right" />
      </Suspense>
    </LanguageProvider>
  );
}
