import { basic } from "@/data/basic";

const defaultLocale = 'en';

const BRAND_NAME = basic.info.brand;
const DEFAULT_TITLE = basic.seo.title;
const DEFAULT_DESCRIPTION = basic.seo.description;

const seoOverrides = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    title: `About Us | ${BRAND_NAME}`,
    description: `Learn about ${BRAND_NAME}. Our story, mission, and commitment to quality.`,
  },
  products: {
    title: `Products Collection | ${BRAND_NAME}`,
    description:
      "Explore our poker product collection for wholesale and custom orders, including poker sets, chips, and tables.",
  },
  contact: {
    title: `Contact Us | ${BRAND_NAME}`,
    description: `Contact ${BRAND_NAME} for wholesale inquiries, OEM/ODM customization, samples, and pricing.`,
  },
  privacy: {
    title: `Privacy Policy | ${BRAND_NAME}`,
    description: `Learn how ${BRAND_NAME} collects, uses, and protects your personal information.`,
  },
  faq: {
    title: `FAQ | ${BRAND_NAME}`,
    description: `Answers to common questions about ${BRAND_NAME}, ordering, customization, shipping, and returns.`,
  },
  terms: {
    title: `Terms of Service | ${BRAND_NAME}`,
    description: `Review the terms and conditions that govern your use of the ${BRAND_NAME} website and services.`,
  },
  shipping: {
    title: `Shipping Policy | ${BRAND_NAME}`,
    description: `Shipping options, delivery times, and policies for ${BRAND_NAME} orders.`,
  },
  return: {
    title: `Return Policy | ${BRAND_NAME}`,
    description: `Return policy, eligibility, and how to initiate a return or exchange with ${BRAND_NAME}.`,
  },
};

// 非默认语言的 SEO 文案（默认语言仍以 data/basic.js 与 seoOverrides 为准）
const seoTranslations = {
  home: {
    title: {
      en: DEFAULT_TITLE,
      es: `${BRAND_NAME} | Sets de póker al por mayor y personalizados`,
      fr: `${BRAND_NAME} | Sets de poker en gros et sur mesure`,
      de: `${BRAND_NAME} | Poker-Sets Großhandel & Individualisierung`,
      ja: `${BRAND_NAME} | ポーカーセット卸売・カスタム対応`,
      ko: `${BRAND_NAME} | 포커 세트 도매 및 커스텀`,
    },
    description: {
      en: DEFAULT_DESCRIPTION,
      es: "Proveedor B2B de sets de póker y accesorios: pedidos al por mayor, OEM/ODM, muestras y precios.",
      fr: "Fournisseur B2B de sets de poker et d’accessoires : commandes en gros, OEM/ODM, échantillons et devis.",
      de: "B2B-Lieferant für Poker-Sets und Zubehör: Großhandel, OEM/ODM, Muster und Preise.",
      ja: "B2B向けポーカーセット/アクセサリー。卸売、OEM/ODM、サンプル、見積もりに対応します。",
      ko: "B2B 포커 세트/액세서리 공급: 도매, OEM/ODM, 샘플 및 견적 문의.",
    },
  },
  about: {
    title: {
      en: `About Us | ${BRAND_NAME}`,
      es: `Sobre Nosotros | ${BRAND_NAME}`,
      fr: `À Propos | ${BRAND_NAME}`,
      de: `Über Uns | ${BRAND_NAME}`,
      ja: `${BRAND_NAME} について`,
      ko: `${BRAND_NAME} 소개`,
    },
    description: {
      en: `Learn about ${BRAND_NAME}. Our story, mission, and commitment to quality.`,
      es: `Conoce ${BRAND_NAME}: nuestra historia, misión y compromiso con la calidad.`,
      fr: `Découvrez ${BRAND_NAME} : notre histoire, notre mission et notre engagement qualité.`,
      de: `Erfahre mehr über ${BRAND_NAME}: unsere Geschichte, Mission und Qualitätsversprechen.`,
      ja: `${BRAND_NAME} のストーリー、使命、品質へのこだわりをご紹介します。`,
      ko: `${BRAND_NAME}의 이야기, 미션, 품질 약속을 확인하세요.`,
    },
  },
  products: {
    title: {
      en: `Products Collection | ${BRAND_NAME}`,
      es: `Colección de Productos | ${BRAND_NAME}`,
      fr: `Collection de Produits | ${BRAND_NAME}`,
      de: `Produktsammlung | ${BRAND_NAME}`,
      ja: `商品コレクション | ${BRAND_NAME}`,
      ko: `제품 컬렉션 | ${BRAND_NAME}`,
    },
    description: {
      en: "Explore our poker product collection for wholesale and custom orders, including poker sets, chips, and tables.",
      es: "Explora nuestra colección de productos de póker para pedidos al por mayor y personalizados: sets, fichas y mesas.",
      fr: "Découvrez notre collection de produits de poker pour les commandes en gros et sur mesure : sets, jetons et tables.",
      de: "Entdecke unsere Poker-Produktkollektion für Großhandel und Individualisierung: Sets, Chips und Tische.",
      ja: "卸売・カスタム向けのポーカー商品コレクション（セット/チップ/テーブル）をご覧ください。",
      ko: "도매/커스텀 주문을 위한 포커 상품 컬렉션(세트/칩/테이블)을 확인하세요.",
    },
  },
  contact: {
    title: {
      en: `Contact Us | ${BRAND_NAME}`,
      es: `Contáctanos | ${BRAND_NAME}`,
      fr: `Contact | ${BRAND_NAME}`,
      de: `Kontakt | ${BRAND_NAME}`,
      ja: `お問い合わせ | ${BRAND_NAME}`,
      ko: `문의하기 | ${BRAND_NAME}`,
    },
    description: {
      en: `Contact ${BRAND_NAME} for wholesale inquiries, OEM/ODM customization, samples, and pricing.`,
      es: `Contacta con ${BRAND_NAME} para consultas de mayorista, OEM/ODM, muestras y precios.`,
      fr: `Contactez ${BRAND_NAME} pour les demandes de gros, OEM/ODM, échantillons et tarifs.`,
      de: `Kontaktiere ${BRAND_NAME} für Großhandelsanfragen, OEM/ODM, Muster und Preise.`,
      ja: `${BRAND_NAME} へのお問い合わせ：卸売、OEM/ODM、サンプル、価格のご相談はこちら。`,
      ko: `${BRAND_NAME} 문의: 도매, OEM/ODM, 샘플 및 가격 상담.`,
    },
  },
  privacy: {
    title: {
      en: `Privacy Policy | ${BRAND_NAME}`,
      es: `Política de Privacidad | ${BRAND_NAME}`,
      fr: `Politique de Confidentialité | ${BRAND_NAME}`,
      de: `Datenschutz | ${BRAND_NAME}`,
      ja: `プライバシーポリシー | ${BRAND_NAME}`,
      ko: `개인정보 처리방침 | ${BRAND_NAME}`,
    },
    description: {
      en: `Learn how ${BRAND_NAME} collects, uses, and protects your personal information.`,
      es: `Descubre cómo ${BRAND_NAME} recopila, utiliza y protege tu información personal.`,
      fr: `Découvrez comment ${BRAND_NAME} collecte, utilise et protège vos informations personnelles.`,
      de: `Erfahre, wie ${BRAND_NAME} personenbezogene Daten erhebt, nutzt und schützt.`,
      ja: `${BRAND_NAME} が個人情報をどのように収集・利用・保護するかをご確認ください。`,
      ko: `${BRAND_NAME}의 개인정보 수집/이용/보호 방침을 확인하세요.`,
    },
  },
  faq: {
    title: {
      en: `FAQ | ${BRAND_NAME}`,
      es: `Preguntas Frecuentes | ${BRAND_NAME}`,
      fr: `FAQ | ${BRAND_NAME}`,
      de: `FAQ | ${BRAND_NAME}`,
      ja: `よくあるご質問 | ${BRAND_NAME}`,
      ko: `자주 묻는 질문 | ${BRAND_NAME}`,
    },
    description: {
      en: `Answers to common questions about ${BRAND_NAME}, ordering, customization, shipping, and returns.`,
      es: `Respuestas sobre ${BRAND_NAME}, pedidos, personalización, envíos y devoluciones.`,
      fr: `Réponses sur ${BRAND_NAME}, commandes, personnalisation, livraison et retours.`,
      de: `Antworten zu ${BRAND_NAME}, Bestellung, Individualisierung, Versand und Rückgabe.`,
      ja: `${BRAND_NAME}、注文、カスタム、配送、返品に関するよくある質問。`,
      ko: `${BRAND_NAME}, 주문, 커스텀, 배송, 반품 관련 FAQ.`,
    },
  },
  terms: {
    title: {
      en: `Terms of Service | ${BRAND_NAME}`,
      es: `Términos de Servicio | ${BRAND_NAME}`,
      fr: `Conditions d’Utilisation | ${BRAND_NAME}`,
      de: `Nutzungsbedingungen | ${BRAND_NAME}`,
      ja: `利用規約 | ${BRAND_NAME}`,
      ko: `이용약관 | ${BRAND_NAME}`,
    },
    description: {
      en: `Review the terms and conditions that govern your use of the ${BRAND_NAME} website and services.`,
      es: `Revisa los términos y condiciones que rigen el uso del sitio web y los servicios de ${BRAND_NAME}.`,
      fr: `Consultez les conditions qui régissent l’utilisation du site et des services ${BRAND_NAME}.`,
      de: `Lies die Bedingungen zur Nutzung der Website und Dienste von ${BRAND_NAME}.`,
      ja: `${BRAND_NAME} のウェブサイト/サービス利用規約をご確認ください。`,
      ko: `${BRAND_NAME} 웹사이트/서비스 이용약관을 확인하세요.`,
    },
  },
  shipping: {
    title: {
      en: `Shipping Policy | ${BRAND_NAME}`,
      es: `Política de Envío | ${BRAND_NAME}`,
      fr: `Politique d’Expédition | ${BRAND_NAME}`,
      de: `Versandrichtlinie | ${BRAND_NAME}`,
      ja: `配送ポリシー | ${BRAND_NAME}`,
      ko: `배송 정책 | ${BRAND_NAME}`,
    },
    description: {
      en: `Shipping options, delivery times, and policies for ${BRAND_NAME} orders.`,
      es: `Opciones de envío, tiempos de entrega y políticas para pedidos de ${BRAND_NAME}.`,
      fr: `Options d’expédition, délais de livraison et politique pour les commandes ${BRAND_NAME}.`,
      de: `Versandoptionen, Lieferzeiten und Richtlinien für Bestellungen bei ${BRAND_NAME}.`,
      ja: `${BRAND_NAME} の配送方法、納期、ポリシーをご案内します。`,
      ko: `${BRAND_NAME} 주문의 배송 옵션/리드타임/정책 안내.`,
    },
  },
  return: {
    title: {
      en: `Return Policy | ${BRAND_NAME}`,
      es: `Política de Devolución | ${BRAND_NAME}`,
      fr: `Politique de Retour | ${BRAND_NAME}`,
      de: `Rückgaberegelung | ${BRAND_NAME}`,
      ja: `返品ポリシー | ${BRAND_NAME}`,
      ko: `반품 정책 | ${BRAND_NAME}`,
    },
    description: {
      en: `Return policy, eligibility, and how to initiate a return or exchange with ${BRAND_NAME}.`,
      es: `Política de devoluciones, elegibilidad y cómo iniciar una devolución o cambio con ${BRAND_NAME}.`,
      fr: `Politique de retour, éligibilité et procédure de retour/échange avec ${BRAND_NAME}.`,
      de: `Rückgabeprozess, Voraussetzungen und wie du eine Rücksendung/Umtausch bei ${BRAND_NAME} startest.`,
      ja: `${BRAND_NAME} の返品ポリシー、対象条件、返品/交換手順をご案内します。`,
      ko: `${BRAND_NAME} 반품 정책/조건 및 반품·교환 절차 안내.`,
    },
  },
};

export function getSeoMeta(pageKey, locale = defaultLocale) {
  const isDefault = locale === defaultLocale;
  const page = seoTranslations[pageKey];

  if (!isDefault && page) {
    return {
      title: page.title[locale] || page.title[defaultLocale],
      description: page.description[locale] || page.description[defaultLocale],
    };
  }

  const override = seoOverrides[pageKey];
  if (override) return override;

  if (page) {
    return {
      title: page.title[defaultLocale],
      description: page.description[defaultLocale],
    };
  }

  return seoOverrides.home;
}
