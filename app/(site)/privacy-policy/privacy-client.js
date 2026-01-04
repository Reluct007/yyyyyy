'use client';

import Policy from "@/components/features/policy";
import { privacy } from "@/data/privacy";
import { useLanguage } from '@/lib/language-context';
import { useEffect, useState } from 'react';

export default function PrivacyClient() {
  const { locale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Privacy页面翻译映射
  const privacyTranslations = {
    "Privacy Policy": {
      en: "Privacy Policy",
      es: "Política de Privacidad",
      fr: "Politique de Confidentialité",
      de: "Datenschutzrichtlinie",
      ja: "プライバシーポリシー",
      ko: "개인정보처리방침"
    }
  };

  // 翻译函数
  const translateText = (text) => {
    if (!text || typeof text !== 'string') return text;
    // 这里可以添加更多的翻译映射
    return text;
  };

  // 应用翻译到数据
  const translatedData = {
    ...privacy,
    title: privacyTranslations["Privacy Policy"][locale] || privacy.title,
    sections: privacy.sections.map(section => ({
      ...section,
      title: section.title ? translateText(section.title) : section.title,
      info: section.info.map(info => translateText(info))
    }))
  };

  return <Policy data={translatedData} />;
}
