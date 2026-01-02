'use client';

import Link from "next/link";
import { basic } from "@/data/basic";
import { useLanguage } from '@/lib/language-context';

export default function Footer({ data = basic.info }) {
  const { translations, locale } = useLanguage();
  
  const policies = [
    { 
      title: translations.footer?.terms || "Terms of Service", 
      href: locale === 'en' ? '/terms-and-conditions' : `/${locale}/terms-of-service` 
    },
    { 
      title: translations.footer?.privacy || "Privacy Policy", 
      href: locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy` 
    }
  ];

  return (
    <section className="container pb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center border-t pt-8 text-sm text-muted-foreground">
        <p>© 2025 {data.brand}. {translations.footer?.copyright || "All rights reserved."}</p>
        <ul className="flex gap-4 mt-4 md:mt-0">
          {policies.map((policy, index) => (
            <li key={index} className="hover:text-primary transition-colors">
              <Link href={policy.href}>{policy.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
