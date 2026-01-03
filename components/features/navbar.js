'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import ContactForm from '@/components/features/contact-form';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { basic } from '@/data/basic';
import { useLanguage } from '@/lib/language-context';
import { useSiteConfig } from '@/lib/site-config-context';

export default function Navbar({ data = basic.navbar }) {
  const { translations, locale } = useLanguage();
  const { config } = useSiteConfig();
  
  // 使用后台配置覆盖默认值
  const brandName = config.siteName || data.brand;
  const logo = config.logo || data.logo;
  
  return (
    <section className="shadow-sm py-4">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden lg:flex justify-between items-center" role="navigation" aria-label="Main navigation">
          <Link href={locale === 'en' ? "/" : `/${locale}`} className="flex items-center gap-4">
            <Image src={logo} className="w-8" alt={`${brandName} logo - Designer collectibles wholesale`} width={100} height={100} />
            <span className="text-xl font-bold">{brandName}</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link href={locale === 'en' ? "/" : `/${locale}`} className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }), "text-base font-medium")}>
              {translations.nav?.home || "Home"}
            </Link>
            <Link href={locale === 'en' ? "/products" : `/${locale}/products`} className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }), "text-base font-medium")}>
              {translations.nav?.products || "Products"}
            </Link>
            <Link href={locale === 'en' ? "/about" : `/${locale}/about`} className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }), "text-base font-medium")}>
              {translations.nav?.about || "About"}
            </Link>
            <Link href={locale === 'en' ? "/contact" : `/${locale}/contact`} className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }), "text-base font-medium")}>
              {translations.nav?.contact || "Contact"}
            </Link>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2">
                {translations.nav?.getQuote || data.buttonText}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] p-8">
              <DialogHeader>
                <DialogTitle>{data.dialogTitle}</DialogTitle>
                <DialogDescription>{data.dialogDescription}</DialogDescription>
              </DialogHeader>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </nav>
        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={locale === 'en' ? "/" : `/${locale}`} className="flex items-center gap-4">
              <Image src={logo} className="w-8" alt={`${brandName} logo - Designer collectibles wholesale`} width={100} height={100} />
              <span className="text-xl font-bold">{brandName}</span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <Image src={logo} className="w-8" alt={`${brandName} logo - Designer collectibles wholesale`} width={100} height={100} />
                      <span className="text-xl font-bold">{brandName}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="my-8 flex flex-col gap-6">
                  <Link href={locale === 'en' ? "/" : `/${locale}`} className="text-base">
                    {translations.nav?.home || "Home"}
                  </Link>
                  <Link href={locale === 'en' ? "/products" : `/${locale}/products`} className="text-base">
                    {translations.nav?.products || "Products"}
                  </Link>
                  <Link href={locale === 'en' ? "/about" : `/${locale}/about`} className="text-base">
                    {translations.nav?.about || "About"}
                  </Link>
                  <Link href={locale === 'en' ? "/contact" : `/${locale}/contact`} className="text-base">
                    {translations.nav?.contact || "Contact"}
                  </Link>
                </div>

                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>{translations.nav?.getQuote || data.buttonText}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px] p-6 lg:p-8 rounded-lg">
                      <DialogHeader>
                        <DialogTitle>{data.dialogTitle}</DialogTitle>
                        <DialogDescription>{data.dialogDescription}</DialogDescription>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};
