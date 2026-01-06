"use client";

import Link from "next/link";
import { basic } from "@/data/basic";
import { useLanguage } from "@/lib/language-context";

export default function Footer({ data = basic.info }) {
  const { translations, locale } = useLanguage();
  const urlPrefix = `/${locale}`;

  const brandName = data.brand;
  const termsUrl = `${urlPrefix}/terms-of-service/`;
  const privacyUrl = `${urlPrefix}/privacy-policy/`;

  return (
    <section className="bg-muted/30 px-4 py-12">
      <div className="container mx-auto">
        <footer>
          <div className="flex flex-col justify-between gap-6 border-t border-border/50 pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
            <p className="text-base">
              © 2025 {brandName}. {translations.footer?.copyright || "All rights reserved."}
            </p>
            <ul className="flex gap-6">
              <li className="underline transition-colors hover:text-primary">
                <Link href={termsUrl}>{translations.footer?.terms || "Terms & Conditions"}</Link>
              </li>
              <li className="underline transition-colors hover:text-primary">
                <Link href={privacyUrl}>{translations.footer?.privacy || "Privacy Policy"}</Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}
