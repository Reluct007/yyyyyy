'use client';

import Link from "next/link";
import { themeFooter } from "@/components/themes/b/data/theme";
import { useLanguage } from '@/lib/language-context';

export default function Footer({ data }) {
  const { translations, locale } = useLanguage();
  
  // 使用主题配置，支持外部覆盖
  const policies = data?.policies || themeFooter.policies;
  const brandText = data?.brand || themeFooter.brand;

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
