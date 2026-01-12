'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { LanguageProvider } from "@/lib/language-context";
import { useSettings } from '@/lib/settings-context';

// Default components
const DefaultNavbar = lazy(() => import("@/components/features/navbar"));
const DefaultFooter = lazy(() => import("@/components/features/footer"));

// Template-specific headers
const ClassicHeader = lazy(() => import("@/components/templates/classic-header"));
const ModernHeader = lazy(() => import("@/components/templates/modern-header"));
const CreativeHeader = lazy(() => import("@/components/templates/creative-header"));
const WhereeHeader = lazy(() => import("@/components/templates/wheree-header"));
const FifineHeader = lazy(() => import("@/components/templates/fifine-header"));
const MaonoHeader = lazy(() => import("@/components/templates/maono-header"));

// Template-specific footers
const ClassicFooter = lazy(() => import("@/components/templates/classic-footer"));
const ModernFooter = lazy(() => import("@/components/templates/modern-footer"));
const CreativeFooter = lazy(() => import("@/components/templates/creative-footer"));
const WhereeFooter = lazy(() => import("@/components/templates/wheree-footer"));
const FifineFooter = lazy(() => import("@/components/templates/fifine-footer"));
const MaonoFooter = lazy(() => import("@/components/templates/maono-footer"));

// Other components
const ScrollToTop = lazy(() => import("@/components/features/scroll-to-top"));
const ToasterWrapper = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));

// 统一站点外壳：避免在多个 Root Layout 中重复 Navbar/Footer/Provider 结构
export default function RootChrome({ children, locale }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAdminPath, setIsAdminPath] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    setIsMounted(true);
    // Check pathname on client-side only
    if (typeof window !== 'undefined') {
      setIsAdminPath(window.location.pathname.startsWith('/admin'));
    }
  }, []);

  // Component mapping
  const headerComponents = {
    'default': DefaultNavbar,
    'classic': ClassicHeader,
    'modern': ModernHeader,
    'creative': CreativeHeader,
    'wheree': WhereeHeader,
    'fifine': FifineHeader,
    'maono': MaonoHeader
  };

  const footerComponents = {
    'default': DefaultFooter,
    'classic': ClassicFooter,
    'modern': ModernFooter,
    'creative': CreativeFooter,
    'wheree': WhereeFooter,
    'fifine': FifineFooter,
    'maono': MaonoFooter
  };

  // Get the appropriate components based on settings
  const HeaderComponent = headerComponents[settings?.headerType] || DefaultNavbar;
  const FooterComponent = footerComponents[settings?.footerType] || DefaultFooter;

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
        {!isAdminPath && <HeaderComponent config={settings?.headerConfig} />}
      </Suspense>
      <main>{children}</main>
      <Suspense fallback={null}>
        {!isAdminPath && <FooterComponent config={settings?.footerConfig} />}
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
