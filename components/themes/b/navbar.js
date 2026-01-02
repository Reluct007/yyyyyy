'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import ContactForm from "@/components/themes/b/contact-form";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { basic } from "@/data/basic";
import { useLanguage } from '@/lib/language-context';

export default function Navbar({ data = basic.navbar }) {
  const { translations, locale } = useLanguage();
  
  const menuItems = [
    { label: translations.nav?.home || "Home", href: locale === 'en' ? "/" : `/${locale}` },
    { label: translations.nav?.products || "Products", href: locale === 'en' ? "/products" : `/${locale}/products` },
    { label: translations.nav?.about || "About", href: locale === 'en' ? "/about" : `/${locale}/about` },
    { label: translations.nav?.contact || "Contact", href: locale === 'en' ? "/contact" : `/${locale}/contact` }
  ];

  return (
    <section className="shadow-sm py-4 border-b">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden lg:flex justify-between items-center">
          <Link href={locale === 'en' ? "/" : `/${locale}`} className="flex items-center gap-4">
            <Image src={data.logo} className="w-8" alt={data.brand} width={100} height={100} />
            <span className="text-xl font-bold">{data.brand}</span>
          </Link>

          <div className="flex items-center gap-2">
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
              <Button>{translations.nav?.getQuote || data.buttonText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] p-8">
              <DialogHeader>
                <DialogTitle>{data.dialogTitle}</DialogTitle>
                <DialogDescription>{data.dialogDescription}</DialogDescription>
              </DialogHeader>
              <ContactForm locale={locale} />
            </DialogContent>
          </Dialog>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={locale === 'en' ? "/" : `/${locale}`} className="flex items-center gap-4">
              <Image src={data.logo} className="w-8" alt={data.brand} width={100} height={100} />
              <span className="text-xl font-bold">{data.brand}</span>
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
                      <Image src={data.logo} className="w-8" alt={data.brand} width={100} height={100} />
                      <span className="text-xl font-bold">{data.brand}</span>
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

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">{translations.nav?.getQuote || data.buttonText}</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px] p-6 rounded-lg">
                    <DialogHeader>
                      <DialogTitle>{data.dialogTitle}</DialogTitle>
                      <DialogDescription>{data.dialogDescription}</DialogDescription>
                    </DialogHeader>
                    <ContactForm locale={locale} />
                  </DialogContent>
                </Dialog>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}
