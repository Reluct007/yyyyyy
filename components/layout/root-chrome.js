import Navbar from "@/components/features/navbar";
import CTA from "@/components/features/cta";
import Footer from "@/components/features/footer";
import ScrollToTop from "@/components/features/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/language-context";

// 统一站点外壳：避免在多个 Root Layout 中重复 Navbar/Footer/Provider 结构
export default function RootChrome({ children }) {
  return (
    <LanguageProvider>
      <Navbar />
      <main>{children}</main>
      <CTA />
      <Footer />
      <ScrollToTop />
      <Toaster richColors position="top-right" />
    </LanguageProvider>
  );
}

