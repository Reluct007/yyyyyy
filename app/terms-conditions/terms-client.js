'use client';

import Policy from "@/components/common/policy";
import { terms } from "@/data/terms";
import { useLanguage } from '@/lib/language-context';
import { useEffect, useState } from 'react';

export default function TermsClient() {
  const { translations: globalTranslations, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Terms页面翻译映射
  const termsTranslations = {
    "Terms & Conditions": {
      en: "Terms & Conditions",
      es: "Términos y Condiciones",
      fr: "Termes et Conditions",
      de: "Allgemeine Geschäftsbedingungen",
      ja: "利用規約",
      ko: "이용약관"
    }
  };

  // 翻译函数
  const translateText = (text, locale) => {
    if (!text || typeof text !== 'string') return text;
    // 这里可以添加更多的翻译映射
    return text;
  };

  // 应用翻译到数据
  const translatedData = {
    ...terms,
    title: termsTranslations["Terms & Conditions"][locale] || terms.title,
    sections: terms.sections.map(section => ({
      ...section,
      title: section.title ? translateText(section.title, locale) : section.title,
      info: section.info.map(info => translateText(info, locale))
    }))
  };

  return <Policy data={translatedData} />;
}

