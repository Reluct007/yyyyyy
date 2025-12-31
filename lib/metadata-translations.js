const defaultLocale = 'en';

const seoTranslations = {
  home: {
    title: {
      en: "Labubu Wholesale - Premium Designer Collectibles & Custom Toys",
      es: "Labubu Wholesale - Coleccionables de Diseñador Premium y Juguetes Personalizados",
      fr: "Labubu Wholesale - Figurines de Designer Premium & Jouets Personnalisés",
      de: "Labubu Wholesale - Premium Designer-Sammlerstücke & Maßgefertigte Spielzeuge",
      ja: "Labubu Wholesale - プレミアムデザイナーコレクタブル & カスタムトイ",
      ko: "Labubu Wholesale - 프리미엄 디자이너 컬렉터블 & 커스텀 토이",
    },
    description: {
      en: "Discover exclusive designer collectibles that bring charm, creativity, and style to your space. Perfect for distributors and retailers worldwide.",
      es: "Descubre coleccionables de diseñador exclusivos que aportan encanto, creatividad y estilo a tu espacio. Perfecto para distribuidores y minoristas de todo el mundo.",
      fr: "Découvrez des figurines de designer exclusives qui apportent charme, créativité et style à vos espaces. Parfaites pour les distributeurs et détaillants du monde entier.",
      de: "Entdecke exklusive Designer-Sammlerstücke, die Charme, Kreativität und Stil in deine Räume bringen. Perfekt für Händler und Einzelhändler weltweit.",
      ja: "魅力と創造性、スタイルを空間にもたらす限定デザイナーコレクションを見つけましょう。世界中のディストリビューターと小売店に最適です。",
      ko: "공간에 매력과 창의성, 스타일을 더하는 독점 디자이너 컬렉터블을 만나보세요. 전 세계 유통업자와 소매업자에게 적합합니다。",
    },
  },
  about: {
    title: {
      en: "About Us - Labubu Wholesale",
      es: "Sobre Nosotros - Labubu Wholesale",
      fr: "À Propos de Nous - Labubu Wholesale",
      de: "Über Uns - Labubu Wholesale",
      ja: "会社概要 - Labubu Wholesale",
      ko: "회사 소개 - Labubu Wholesale",
    },
    description: {
      en: "Learn about Labubu Wholesale - Premium designer collectibles manufacturer. Our story, mission, and commitment to quality craftsmanship.",
      es: "Conoce Labubu Wholesale: fabricante de coleccionables de diseñador premium. Nuestra historia, misión y compromiso con la calidad artesanal.",
      fr: "Découvrez Labubu Wholesale : fabricant de figurines de designer premium. Notre histoire, notre mission et notre engagement pour une qualité irréprochable.",
      de: "Erfahre mehr über Labubu Wholesale – Hersteller von Premium Designer-Sammlerstücken. Unsere Geschichte, Mission und unser Qualitätsversprechen.",
      ja: "Labubu Wholesale の歩みと使命、高品質なクラフトマンシップへのこだわりをご紹介します。",
      ko: "프리미엄 디자이너 컬렉터블 제조사 Labubu Wholesale를 소개합니다. 우리의 이야기, 미션, 그리고 품질에 대한 약속을 확인하세요.",
    },
  },
  products: {
    title: {
      en: "Products Collection - Labubu Wholesale",
      es: "Colección de Productos - Labubu Wholesale",
      fr: "Collection de Produits - Labubu Wholesale",
      de: "Produktkollektion - Labubu Wholesale",
      ja: "商品コレクション - Labubu Wholesale",
      ko: "제품 컬렉션 - Labubu Wholesale"
    },
    description: {
      en: "Explore our premium collection of designer collectibles. Find the perfect pieces for your store from our wide range of high-quality products.",
      es: "Explora nuestra exclusiva colección de coleccionables de diseñador. Encuentra las piezas perfectas para tu tienda en nuestra amplia gama de productos de alta calidad.",
      fr: "Découvrez notre collection premium de figurines de designer. Trouvez les pièces parfaites pour votre magasin parmi notre large gamme de produits de haute qualité.",
      de: "Entdecken Sie unsere Premium-Kollektion von Designer-Sammlerstücken. Finden Sie die perfekten Stücke für Ihren Shop in unserem breiten Sortiment an hochwertigen Produkten.",
      ja: "プレミアムデザイナーコレクタブルのコレクションをご覧ください。高品質な製品の幅広いラインナップから、お店にぴったりのアイテムを見つけてください。",
      ko: "프리미엄 디자이너 컬렉터블 컬렉션을 살펴보세요. 고품질 제품의 다양한 라인업에서 매장에 딱 맞는 아이템을 찾아보세요."
    }
  },
  contact: {
    title: {
      en: "Contact Us - Labubu Wholesale",
      es: "Contáctanos - Labubu Wholesale",
      fr: "Contactez-nous - Labubu Wholesale",
      de: "Kontakt - Labubu Wholesale",
      ja: "お問い合わせ - Labubu Wholesale",
      ko: "문의하기 - Labubu Wholesale",
    },
    description: {
      en: "Get in touch with Labubu Wholesale. Contact us for inquiries about our premium designer collectibles, wholesale orders, and custom products.",
      es: "Ponte en contacto con Labubu Wholesale. Escríbenos para consultas sobre coleccionables de diseñador premium, pedidos al por mayor y productos personalizados.",
      fr: "Contactez Labubu Wholesale pour toute question sur nos figurines de designer premium, commandes en gros ou produits personnalisés.",
      de: "Kontaktiere Labubu Wholesale für Anfragen zu unseren Premium Designer-Sammlerstücken, Großbestellungen und individuellen Produkten.",
      ja: "Labubu Wholesale へのお問い合わせはこちら。プレミアムデザイナーコレクション、卸注文、カスタム製品のご相談を承ります。",
      ko: "Labubu Wholesale에 문의하세요. 프리미엄 디자이너 컬렉터블, 도매 주문, 맞춤 제품 관련 문의를 환영합니다.",
    },
  },
  faq: {
    title: {
      en: "Frequently Asked Questions - Labubu Wholesale",
      es: "Preguntas Frecuentes - Labubu Wholesale",
      fr: "Foire aux Questions - Labubu Wholesale",
      de: "Häufig Gestellte Fragen - Labubu Wholesale",
      ja: "よくあるご質問 - Labubu Wholesale",
      ko: "자주 묻는 질문 - Labubu Wholesale"
    },
    description: {
      en: "Find answers to common questions about our products, ordering process, shipping, returns, and more at Labubu Wholesale.",
      es: "Encuentra respuestas a preguntas comunes sobre nuestros productos, proceso de pedido, envíos, devoluciones y más en Labubu Wholesale.",
      fr: "Trouvez des réponses aux questions courantes sur nos produits, le processus de commande, la livraison, les retours et plus encore chez Labubu Wholesale.",
      de: "Finden Sie Antworten auf häufig gestellte Fragen zu unseren Produkten, Bestellvorgang, Versand, Rücksendungen und mehr bei Labubu Wholesale.",
      ja: "Labubu Wholesaleの製品、注文プロセス、配送、返品などに関するよくある質問への回答をご覧ください。",
      ko: "Labubu Wholesale의 제품, 주문 프로세스, 배송, 반품 등에 대한 자주 묻는 질문에 대한 답변을 찾아보세요."
    }
  },
  privacy: {
    title: {
      en: "Privacy Policy - Labubu Wholesale",
      es: "Política de Privacidad - Labubu Wholesale",
      fr: "Politique de Confidentialité - Labubu Wholesale",
      de: "Datenschutzerklärung - Labubu Wholesale",
      ja: "プライバシーポリシー - Labubu Wholesale",
      ko: "개인정보 처리방침 - Labubu Wholesale"
    },
    description: {
      en: "Learn how Labubu Wholesale collects, uses, and protects your personal information. Read our comprehensive Privacy Policy.",
      es: "Descubre cómo Labubu Wholesale recopila, utiliza y protege tu información personal. Lee nuestra Política de Privacidad completa.",
      fr: "Découvrez comment Labubu Wholesale collecte, utilise et protège vos informations personnelles. Lisez notre Politique de Confidentialité complète.",
      de: "Erfahren Sie, wie Labubu Wholesale Ihre persönlichen Daten erhebt, verwendet und schützt. Lesen Sie unsere umfassende Datenschutzerklärung.",
      ja: "Labubu Wholesaleが個人情報をどのように収集、使用、保護しているかご確認ください。詳細なプライバシーポリシーをご覧ください。",
      ko: "Labubu Wholesale이 개인정보를 수집, 사용, 보호하는 방법을 알아보세요. 자세한 개인정보 처리방침을 확인하세요."
    }
  },
  terms: {
    title: {
      en: "Terms of Service - Labubu Wholesale",
      es: "Términos de Servicio - Labubu Wholesale",
      fr: "Conditions d'Utilisation - Labubu Wholesale",
      de: "Nutzungsbedingungen - Labubu Wholesale",
      ja: "利用規約 - Labubu Wholesale",
      ko: "이용약관 - Labubu Wholesale"
    },
    description: {
      en: "Review the Terms of Service that govern your use of the Labubu Wholesale website and services. By accessing our site, you agree to these terms.",
      es: "Revisa los Términos de Servicio que rigen el uso del sitio web y servicios de Labubu Wholesale. Al acceder a nuestro sitio, aceptas estos términos.",
      fr: "Consultez les Conditions d'Utilisation qui régissent votre utilisation du site web et des services de Labubu Wholesale. En accédant à notre site, vous acceptez ces conditions.",
      de: "Lesen Sie die Nutzungsbedingungen, die die Nutzung der Website und der Dienste von Labubu Wholesale regeln. Durch den Zugriff auf unsere Website erklären Sie sich mit diesen Bedingungen einverstanden.",
      ja: "Labubu Wholesaleのウェブサイトとサービスの利用を規定する利用規約をご確認ください。当サイトにアクセスすることで、これらの規約に同意したものとみなされます。",
      ko: "Labubu Wholesale 웹사이트 및 서비스 이용을 규정하는 이용약관을 검토하세요. 당사 사이트에 접속함으로써 귀하는 이 약관에 동의하는 것으로 간주됩니다."
    }
  },
  shipping: {
    title: {
      en: "Shipping Policy - Labubu Wholesale",
      es: "Política de Envío - Labubu Wholesale",
      fr: "Politique d'Expédition - Labubu Wholesale",
      de: "Versandrichtlinie - Labubu Wholesale",
      ja: "配送ポリシー - Labubu Wholesale",
      ko: "배송 정책 - Labubu Wholesale"
    },
    description: {
      en: "Learn about our shipping options, delivery times, and policies. We offer reliable worldwide shipping for all our designer collectibles.",
      es: "Conoce nuestras opciones de envío, tiempos de entrega y políticas. Ofrecemos envíos confiables a todo el mundo para todos nuestros coleccionables de diseñador.",
      fr: "Découvrez nos options d'expédition, délais de livraison et politiques. Nous proposons une livraison fiable dans le monde entier pour toutes nos figurines de designer.",
      de: "Erfahren Sie mehr über unsere Versandoptionen, Lieferzeiten und Richtlinien. Wir bieten einen zuverlässigen weltweiten Versand für alle unsere Designer-Sammlerstücke an.",
      ja: "配送オプション、お届けまでの時間、ポリシーについてご覧ください。当社のデザイナーコレクタブル商品は世界中に確実にお届けします。",
      ko: "배송 옵션, 배송 시간, 정책에 대해 알아보세요. 저희 디자이너 컬렉터블 제품은 전 세계로 안정적인 배송 서비스를 제공합니다."
    }
  },
  return: {
    title: {
      en: "Return Policy - Labubu Wholesale",
      es: "Política de Devolución - Labubu Wholesale",
      fr: "Politique de Retour - Labubu Wholesale",
      de: "Rückgabebedingungen - Labubu Wholesale",
      ja: "返品ポリシー - Labubu Wholesale",
      ko: "반품 정책 - Labubu Wholesale"
    },
    description: {
      en: "Review our return policy for designer collectibles. Learn about our return process, eligibility, and how to initiate a return or exchange.",
      es: "Revisa nuestra política de devolución para coleccionables de diseñador. Infórmate sobre nuestro proceso de devolución, elegibilidad y cómo iniciar una devolución o cambio.",
      fr: "Consultez notre politique de retour pour les figurines de designer. Découvrez notre processus de retour, les conditions d'éligibilité et comment initier un retour ou un échange.",
      de: "Lesen Sie unsere Rückgabebedingungen für Designer-Sammlerstücke. Erfahren Sie mehr über unseren Rückgabeprozess, die Berechtigung und wie Sie eine Rücksendung oder einen Umtausch veranlassen können.",
      ja: "デザイナーコレクタブル商品の返品ポリシーをご確認ください。返品プロセス、対象商品、返品・交換の手続き方法についてご案内します。",
      ko: "디자이너 컬렉터블 제품에 대한 반품 정책을 확인하세요. 반품 프로세스, 자격 요건, 반품 또는 교환을 시작하는 방법에 대해 알아보세요."
    }
  }
};

export function getSeoMeta(pageKey, locale = defaultLocale) {
  const page = seoTranslations[pageKey];
  if (!page) {
    return {
      title: seoTranslations.home.title[locale] || seoTranslations.home.title[defaultLocale],
      description: seoTranslations.home.description[locale] || seoTranslations.home.description[defaultLocale],
    };
  }

  return {
    title: page.title[locale] || page.title[defaultLocale],
    description: page.description[locale] || page.description[defaultLocale],
  };
}
