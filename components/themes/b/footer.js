'use client';

import Link from "next/link";
import { footer } from "@/components/themes/b/data/home";
import { useLanguage } from '@/lib/language-context';

export default function Footer({ data = footer }) {
  const { translations, locale } = useLanguage();
  
  const policies = data.policies || [
    { title: "Terms of Service", href: '/terms-and-conditions' },
    { title: "Privacy Policy", href: '/privacy-policy' }
  ];

  const brandText = data.brand || `© 2025 B For Anything. All rights reserved.`;

  return (
    <section className="container mx-auto px-4 pb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center border-t pt-8 text-sm text-muted-foreground">
        <p>{brandText}</p>
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
