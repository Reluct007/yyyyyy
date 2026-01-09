'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/features/navbar";
import CTA from "@/components/features/cta";
import Footer from "@/components/features/footer";
import ScrollToTop from "@/components/features/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/language-context";

// 统一站点外壳：避免在多个 Root Layout 中重复 Navbar/Footer/Provider 结构
export default function RootChrome({ children, locale }) {
  const pathname = usePathname();

  // 检查是否在admin路径下
  const isAdminPath = pathname?.startsWith('/admin');

  return (
    <LanguageProvider initialLocale={locale}>
      {!isAdminPath && <Navbar />}
      <main>{children}</main>
      {!isAdminPath && <Footer />}
      <ScrollToTop />
      <Toaster richColors position="top-right" />
    </LanguageProvider>
  );
}
