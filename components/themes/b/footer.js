'use client';

import Link from "next/link";
import { basic } from "@/data/basic";
import { useLanguage } from '@/lib/language-context';

export default function Footer({ data = basic.info }) {
  const { translations, locale } = useLanguage();
  
  const termsUrl = locale === 'en' ? '/terms-and-conditions' : `/${locale}/terms-of-service`;
  const privacyUrl = locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`;
  
  return (
    <section className="py-10 px-4 bg-muted/20">
      <div className="container mx-auto">
        <footer>
          <div className="flex flex-col justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
            <p>© 2025 {data.brand}. {translations.footer?.copyright || "All rights reserved."}</p>
            <ul className="flex gap-6">
              <li className="underline hover:text-foreground transition-colors">
                <Link href={termsUrl}>{translations.footer?.terms || "Terms & Conditions"}</Link>
              </li>
              <li className="underline hover:text-foreground transition-colors">
                <Link href={privacyUrl}>{translations.footer?.privacy || "Privacy Policy"}</Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}
