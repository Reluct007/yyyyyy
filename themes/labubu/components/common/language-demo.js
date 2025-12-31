'use client';

import { useLanguage } from '@/lib/language-context';

export default function LanguageDemo() {
  const { translations } = useLanguage();

  return (
    <div className="p-4 border rounded-lg bg-accent/50">
      <h3 className="text-lg font-semibold mb-2">Language Demo</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Current language: {translations.language?.current || 'English'}
      </p>
      <div className="space-y-1 text-sm">
        <p><strong>Home:</strong> {translations.nav?.home || 'Home'}</p>
        <p><strong>About:</strong> {translations.nav?.about || 'About'}</p>
        <p><strong>Products:</strong> {translations.nav?.products || 'Products'}</p>
        <p><strong>Contact:</strong> {translations.nav?.contact || 'Contact'}</p>
      </div>
    </div>
  );
}
