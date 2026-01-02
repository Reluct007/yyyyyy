'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import ContactForm from "@/components/themes/b/contact-form";
import { themeBrand, themeNavButton, themeNavMenu } from "@/components/themes/b/data/theme";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from '@/lib/language-context';

export default function Navbar({ data }) {
  const { translations, locale } = useLanguage();
  
  // 使用主题配置，支持外部覆盖
  const brandName = data?.brand?.name || themeBrand.name;
  const brandLogo = data?.brand?.logo || themeBrand.logo;
  const buttonText = data?.button?.text || themeNavButton.text;
  const dialogTitle = data?.button?.title || themeNavButton.title;
  const dialogDescription = data?.button?.description || themeNavButton.description;

  // 导航菜单支持多语言
  const menuItems = themeNavMenu.map(item => ({
    label: translations.nav?.[item.label.toLowerCase()] || item.label,
    href: locale === 'en' ? item.href : `/${locale}${item.href === '/' ? '' : item.href}`
  }));

  return (
    <section className="shadow-sm py-4">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden lg:flex justify-between">
          <Link href={locale === 'en' ? "/" : `/${locale}`} className="flex items-center gap-4">
            <Image src={brandLogo} className="w-8" alt={brandName} width={100} height={100} />
            <span className="text-xl font-bold">{brandName}</span>
          </Link>

          <div className="flex items-center gap-4">
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }))}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>{translations.nav?.getQuote || buttonText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] p-8">
              <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogDescription>{dialogDescription}</DialogDescription>
              </DialogHeader>
              <ContactForm locale={locale} />
            </DialogContent>
          </Dialog>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={locale === 'en' ? "/" : `/${locale}`} className="flex items-center gap-4">
              <Image src={brandLogo} className="w-8" alt={brandName} width={100} height={100} />
              <span className="text-xl font-bold">{brandName}</span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <Image src={brandLogo} className="w-8" alt={brandName} width={100} height={100} />
                      <span className="text-xl font-bold">{brandName}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="my-8 flex flex-col gap-6">
                  {menuItems.map((item, index) => (
                    <Link key={index} href={item.href} className="text-base">
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>{translations.nav?.getQuote || buttonText}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px] p-6 lg:p-8 rounded-lg">
                      <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogDescription>{dialogDescription}</DialogDescription>
                      </DialogHeader>
                      <ContactForm locale={locale} />
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
}
