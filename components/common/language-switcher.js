'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

export default function LanguageSwitcher() {
  const { locale, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale) => {
    changeLanguage(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        aria-label="Switch language"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage.flag}</span>
        <span className="hidden md:inline">{currentLanguage.name}</span>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-accent transition-colors ${
                language.code === locale ? 'bg-accent' : ''
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
              {language.code === locale && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
