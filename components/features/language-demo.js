"use client";

import { useLanguage } from "@/lib/language-context";

export default function LanguageDemo() {
  const { translations } = useLanguage();

  return (
    <div className="rounded-lg border bg-accent/50 p-4">
      <h3 className="mb-2 text-lg font-semibold">Language Demo</h3>
      <p className="mb-2 text-sm text-muted-foreground">
        Current language: {translations.language?.current || "English"}
      </p>
      <div className="space-y-1 text-sm">
        <p>
          <strong>Home:</strong> {translations.nav?.home || "Home"}
        </p>
        <p>
          <strong>About:</strong> {translations.nav?.about || "About"}
        </p>
        <p>
          <strong>Products:</strong> {translations.nav?.products || "Products"}
        </p>
        <p>
          <strong>Contact:</strong> {translations.nav?.contact || "Contact"}
        </p>
      </div>
    </div>
  );
}
