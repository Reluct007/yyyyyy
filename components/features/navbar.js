"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import ContactForm from "@/components/features/contact-form";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { basic } from "@/data/basic";
import { products } from "@/data/products";
import { useLanguage } from "@/lib/language-context";
import { DEFAULT_LOCALE } from "@/data/i18n";
import slugify from "slugify";

export default function Navbar({ data = basic.navbar }) {
  const { translations, locale } = useLanguage();
  const urlPrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  const brandName = data.brand;
  const logo = data.logo;

  // 从 products.js 获取分类列表
  const categories = products.products.map((p) => ({
    title: p.title,
    slug: slugify(p.title, { lower: true, strict: true }),
    description: p.description.substring(0, 80) + "...",
  }));

  return (
    <section className="py-4 shadow-sm">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav
          className="hidden items-center justify-between lg:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link href={`${urlPrefix}/`} className="flex items-center gap-4">
            <Image src={logo} className="w-8" alt={`${brandName} logo`} width={100} height={100} />
            <span className="text-xl font-bold">{brandName}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`${urlPrefix}/`}
              className={cn(
                navigationMenuTriggerStyle(),
                buttonVariants({ variant: "ghost" }),
                "text-base font-medium",
              )}
            >
              {translations.nav?.home || "Home"}
            </Link>

            {/* Products 下拉菜单 */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium">
                    {translations.nav?.products || "Products"}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link
                            href={`${urlPrefix}/collection/`}
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mb-2 text-lg font-medium">All Products</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Browse our complete collection of poker sets, chips, tables, and
                              accessories.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {categories.map((category) => (
                        <li key={category.slug}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`${urlPrefix}/collection/${category.slug}/`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {category.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href={`${urlPrefix}/about/`}
              className={cn(
                navigationMenuTriggerStyle(),
                buttonVariants({ variant: "ghost" }),
                "text-base font-medium",
              )}
            >
              {translations.nav?.about || "About"}
            </Link>
            <Link
              href={`${urlPrefix}/contact/`}
              className={cn(
                navigationMenuTriggerStyle(),
                buttonVariants({ variant: "ghost" }),
                "text-base font-medium",
              )}
            >
              {translations.nav?.contact || "Contact"}
            </Link>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-primary/90">
                {translations.nav?.getQuote || data.buttonText}
              </Button>
            </DialogTrigger>
            <DialogContent className="p-8 sm:max-w-[625px]">
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
            <Link href={`${urlPrefix}/`} className="flex items-center gap-4">
              <Image
                src={logo}
                className="w-8"
                alt={`${brandName} logo`}
                width={100}
                height={100}
              />
              <span className="text-xl font-bold">{brandName}</span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"} aria-label="Open menu">
                  <Menu className="size-4" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={`${urlPrefix}/`} className="flex items-center gap-2">
                      <Image
                        src={logo}
                        className="w-8"
                        alt={`${brandName} logo`}
                        width={100}
                        height={100}
                      />
                      <span className="text-xl font-bold">{brandName}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="my-8 flex flex-col gap-4">
                  <Link href={`${urlPrefix}/`} className="text-base font-medium">
                    {translations.nav?.home || "Home"}
                  </Link>

                  {/* Products with subcategories */}
                  <div className="space-y-2">
                    <Link href={`${urlPrefix}/collection/`} className="text-base font-medium">
                      {translations.nav?.products || "Products"}
                    </Link>
                    <div className="space-y-2 border-l-2 border-muted pl-4">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`${urlPrefix}/collection/${category.slug}/`}
                          className="block text-sm text-muted-foreground hover:text-foreground"
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link href={`${urlPrefix}/about/`} className="text-base font-medium">
                    {translations.nav?.about || "About"}
                  </Link>
                  <Link href={`${urlPrefix}/contact/`} className="text-base font-medium">
                    {translations.nav?.contact || "Contact"}
                  </Link>
                </div>

                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>{translations.nav?.getQuote || data.buttonText}</Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-lg p-6 sm:max-w-[625px] lg:p-8">
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
}
