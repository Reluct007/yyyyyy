// Static content for policy pages - no file system access needed
import { basic } from "@/data/basic";

const BRAND_NAME = basic.info.brand;
const CONTACT_EMAIL = basic.info.email;

export const privacyContent = {
  en: {
    title: "Privacy Policy",
    content: `
      <p>Last updated: December 16, 2025</p>
      
      <h2>1. Introduction</h2>
      <p>Welcome to ${BRAND_NAME}. We are committed to protecting your personal information and your right to privacy.</p>
      
      <h2>2. Information We Collect</h2>
      <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.</p>
      
      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect or receive:</p>
      <ul>
        <li>To send you marketing and promotional communications</li>
        <li>To send administrative information to you</li>
        <li>To protect our Services</li>
        <li>To enforce our terms, conditions, and policies</li>
      </ul>
      
      <h2>4. Sharing Your Information</h2>
      <p>We only share information with your consent, to comply with laws, or to protect your rights.</p>
    `,
  },
  es: {
    title: "Política de Privacidad",
    content: `
      <p>Última actualización: 16 de diciembre de 2025</p>
      
      <h2>1. Introducción</h2>
      <p>Bienvenido a ${BRAND_NAME}. Nos comprometemos a proteger su información personal y su derecho a la privacidad.</p>
      
      <h2>2. Información que Recopilamos</h2>
      <p>Recopilamos información personal que usted nos proporciona voluntariamente cuando se registra en el sitio web, expresa interés en obtener información sobre nosotros o nuestros productos y servicios, o de otra manera cuando se pone en contacto con nosotros.</p>
      
      <h2>3. Cómo Utilizamos Su Información</h2>
      <p>Utilizamos la información que recopilamos o recibimos:</p>
      <ul>
        <li>Para enviarle comunicaciones de marketing y promocionales</li>
        <li>Para enviarle información administrativa</li>
        <li>Para proteger nuestros Servicios</li>
        <li>Para hacer cumplir nuestros términos, condiciones y políticas</li>
      </ul>
      
      <h2>4. Compartir Su Información</h2>
      <p>Solo compartimos información con su consentimiento, para cumplir con las leyes o para proteger sus derechos.</p>
    `,
  },
  fr: {
    title: "Politique de Confidentialité",
    content: `
      <p>Dernière mise à jour: 16 décembre 2025</p>
      
      <h2>1. Introduction</h2>
      <p>Bienvenue chez ${BRAND_NAME}. Nous nous engageons à protéger vos informations personnelles et votre droit à la vie privée.</p>
      
      <h2>2. Informations que Nous Collectons</h2>
      <p>Nous collectons les informations personnelles que vous nous fournissez volontairement lorsque vous vous inscrivez sur le site web, exprimez un intérêt pour obtenir des informations sur nous ou nos produits et services, ou autrement lorsque vous nous contactez.</p>
      
      <h2>3. Comment Nous Utilisons Vos Informations</h2>
      <p>Nous utilisons les informations que nous collectons ou recevons:</p>
      <ul>
        <li>Pour vous envoyer des communications marketing et promotionnelles</li>
        <li>Pour vous envoyer des informations administratives</li>
        <li>Pour protéger nos Services</li>
        <li>Pour faire respecter nos termes, conditions et politiques</li>
      </ul>
      
      <h2>4. Partage de Vos Informations</h2>
      <p>Nous ne partageons des informations qu'avec votre consentement, pour nous conformer aux lois ou pour protéger vos droits.</p>
    `,
  },
  de: {
    title: "Datenschutzrichtlinie",
    content: `
      <p>Letzte Aktualisierung: 16. Dezember 2025</p>
      
      <h2>1. Einführung</h2>
      <p>Willkommen bei ${BRAND_NAME}. Wir verpflichten uns, Ihre persönlichen Daten und Ihr Recht auf Privatsphäre zu schützen.</p>
      
      <h2>2. Informationen, die Wir Sammeln</h2>
      <p>Wir sammeln persönliche Informationen, die Sie uns freiwillig zur Verfügung stellen, wenn Sie sich auf der Website registrieren, Interesse daran bekunden, Informationen über uns oder unsere Produkte und Dienstleistungen zu erhalten, oder anderweitig Kontakt mit uns aufnehmen.</p>
      
      <h2>3. Wie Wir Ihre Informationen Verwenden</h2>
      <p>Wir verwenden die Informationen, die wir sammeln oder erhalten:</p>
      <ul>
        <li>Um Ihnen Marketing- und Werbemitteilungen zu senden</li>
        <li>Um Ihnen administrative Informationen zu senden</li>
        <li>Um unsere Dienste zu schützen</li>
        <li>Um unsere Bedingungen, Konditionen und Richtlinien durchzusetzen</li>
      </ul>
      
      <h2>4. Weitergabe Ihrer Informationen</h2>
      <p>Wir geben Informationen nur mit Ihrer Zustimmung weiter, um Gesetzen zu entsprechen oder um Ihre Rechte zu schützen.</p>
    `,
  },
  ja: {
    title: "プライバシーポリシー",
    content: `
      <p>最終更新日: 2025年12月16日</p>
      
      <h2>1. はじめに</h2>
      <p>${BRAND_NAME}へようこそ。私たちはお客様の個人情報とプライバシーの権利を保護することをお約束します。</p>
      
      <h2>2. 収集する情報</h2>
      <p>ウェブサイトに登録する際、当社または当社の製品やサービスに関する情報を入手することに関心を示す際、またはその他の方法で当社に連絡する際に、お客様が自発的に提供する個人情報を収集します。</p>
      
      <h2>3. 情報の使用方法</h2>
      <p>収集または受信した情報を以下の目的で使用します：</p>
      <ul>
        <li>マーケティングおよびプロモーションの通信を送信するため</li>
        <li>管理情報を送信するため</li>
        <li>当社のサービスを保護するため</li>
        <li>当社の規約、条件、およびポリシーを施行するため</li>
      </ul>
      
      <h2>4. 情報の共有</h2>
      <p>お客様の同意がある場合、法律を遵守するため、またはお客様の権利を保護するためにのみ情報を共有します。</p>
    `,
  },
  ko: {
    title: "개인정보 처리방침",
    content: `
      <p>최종 업데이트: 2025년 12월 16일</p>
      
      <h2>1. 소개</h2>
      <p>${BRAND_NAME}에 오신 것을 환영합니다. 우리는 귀하의 개인 정보와 개인 정보 보호 권리를 보호하기 위해 최선을 다하고 있습니다.</p>
      
      <h2>2. 수집하는 정보</h2>
      <p>웹사이트에 등록하거나, 당사 또는 당사의 제품 및 서비스에 대한 정보를 얻는 데 관심을 표명하거나, 기타 방법으로 당사에 연락할 때 자발적으로 제공하는 개인 정보를 수집합니다.</p>
      
      <h2>3. 정보 사용 방법</h2>
      <p>수집하거나 받은 정보를 다음과 같이 사용합니다:</p>
      <ul>
        <li>마케팅 및 프로모션 커뮤니케이션을 보내기 위해</li>
        <li>관리 정보를 보내기 위해</li>
        <li>서비스를 보호하기 위해</li>
        <li>약관, 조건 및 정책을 시행하기 위해</li>
      </ul>
      
      <h2>4. 정보 공유</h2>
      <p>귀하의 동의가 있거나, 법률을 준수하거나, 귀하의 권리를 보호하기 위해서만 정보를 공유합니다.</p>
    `,
  },
};

export const termsContent = {
  en: {
    title: "Terms of Service",
    content: `
      <p>Last updated: December 16, 2025</p>
      
      <h2>1. Agreement to Terms</h2>
      <p>By accessing our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
      
      <h2>2. Use License</h2>
      <p>Permission is granted to temporarily download one copy of the materials on ${BRAND_NAME}'s website for personal, non-commercial transitory viewing only.</p>
      
      <h2>3. Disclaimer</h2>
      <p>The materials on ${BRAND_NAME}'s website are provided on an 'as is' basis. ${BRAND_NAME} makes no warranties, expressed or implied.</p>
      
      <h2>4. Limitations</h2>
      <p>In no event shall ${BRAND_NAME} or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
    `,
  },
  es: {
    title: "Términos de Servicio",
    content: `
      <p>Última actualización: 16 de diciembre de 2025</p>
      
      <h2>1. Acuerdo con los Términos</h2>
      <p>Al acceder a nuestro sitio web, usted acepta estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables.</p>
      
      <h2>2. Licencia de Uso</h2>
      <p>Se otorga permiso para descargar temporalmente una copia de los materiales en el sitio web de ${BRAND_NAME} solo para visualización personal y no comercial.</p>
      
      <h2>3. Descargo de Responsabilidad</h2>
      <p>Los materiales en el sitio web de ${BRAND_NAME} se proporcionan 'tal cual'. ${BRAND_NAME} no ofrece garantías, expresas o implícitas.</p>
      
      <h2>4. Limitaciones</h2>
      <p>En ningún caso ${BRAND_NAME} o sus proveedores serán responsables de ningún daño que surja del uso o la imposibilidad de usar los materiales en nuestro sitio web.</p>
    `,
  },
  fr: {
    title: "Conditions d'Utilisation",
    content: `
      <p>Dernière mise à jour: 16 décembre 2025</p>
      
      <h2>1. Acceptation des Conditions</h2>
      <p>En accédant à notre site web, vous acceptez d'être lié par ces Conditions d'Utilisation et toutes les lois et réglementations applicables.</p>
      
      <h2>2. Licence d'Utilisation</h2>
      <p>L'autorisation est accordée de télécharger temporairement une copie des matériaux sur le site web de ${BRAND_NAME} pour une visualisation personnelle et non commerciale uniquement.</p>
      
      <h2>3. Clause de Non-Responsabilité</h2>
      <p>Les matériaux sur le site web de ${BRAND_NAME} sont fournis 'tels quels'. ${BRAND_NAME} ne fait aucune garantie, expresse ou implicite.</p>
      
      <h2>4. Limitations</h2>
      <p>En aucun cas ${BRAND_NAME} ou ses fournisseurs ne seront responsables de tout dommage découlant de l'utilisation ou de l'impossibilité d'utiliser les matériaux sur notre site web.</p>
    `,
  },
  de: {
    title: "Nutzungsbedingungen",
    content: `
      <p>Letzte Aktualisierung: 16. Dezember 2025</p>
      
      <h2>1. Zustimmung zu den Bedingungen</h2>
      <p>Durch den Zugriff auf unsere Website erklären Sie sich mit diesen Nutzungsbedingungen und allen geltenden Gesetzen und Vorschriften einverstanden.</p>
      
      <h2>2. Nutzungslizenz</h2>
      <p>Die Erlaubnis wird erteilt, vorübergehend eine Kopie der Materialien auf der Website von ${BRAND_NAME} nur für die persönliche, nicht-kommerzielle Ansicht herunterzuladen.</p>
      
      <h2>3. Haftungsausschluss</h2>
      <p>Die Materialien auf der Website von ${BRAND_NAME} werden 'wie besehen' bereitgestellt. ${BRAND_NAME} gibt keine Garantien, weder ausdrücklich noch stillschweigend.</p>
      
      <h2>4. Einschränkungen</h2>
      <p>In keinem Fall haften ${BRAND_NAME} oder seine Lieferanten für Schäden, die sich aus der Nutzung oder der Unmöglichkeit der Nutzung der Materialien auf unserer Website ergeben.</p>
    `,
  },
  ja: {
    title: "利用規約",
    content: `
      <p>最終更新日: 2025年12月16日</p>
      
      <h2>1. 規約への同意</h2>
      <p>当社のウェブサイトにアクセスすることにより、お客様はこれらの利用規約およびすべての適用法規に拘束されることに同意したものとみなされます。</p>
      
      <h2>2. 使用ライセンス</h2>
      <p>${BRAND_NAME}のウェブサイト上の資料の一時的なダウンロードは、個人的かつ非商業的な一時的な閲覧のみを目的として許可されています。</p>
      
      <h2>3. 免責事項</h2>
      <p>${BRAND_NAME}のウェブサイト上の資料は「現状のまま」提供されます。${BRAND_NAME}は明示的または黙示的な保証を行いません。</p>
      
      <h2>4. 制限事項</h2>
      <p>いかなる場合も、${BRAND_NAME}またはそのサプライヤーは、当社のウェブサイト上の資料の使用または使用不能から生じるいかなる損害についても責任を負いません。</p>
    `,
  },
  ko: {
    title: "이용약관",
    content: `
      <p>최종 업데이트: 2025년 12월 16일</p>
      
      <h2>1. 약관 동의</h2>
      <p>당사 웹사이트에 접속함으로써 귀하는 본 이용약관 및 모든 관련 법률 및 규정에 구속되는 것에 동의합니다.</p>
      
      <h2>2. 사용 라이선스</h2>
      <p>${BRAND_NAME} 웹사이트의 자료를 개인적이고 비상업적인 일시적 열람 목적으로만 임시로 다운로드할 수 있는 권한이 부여됩니다.</p>
      
      <h2>3. 면책 조항</h2>
      <p>${BRAND_NAME} 웹사이트의 자료는 '있는 그대로' 제공됩니다. ${BRAND_NAME}은 명시적이거나 묵시적인 보증을 하지 않습니다.</p>
      
      <h2>4. 제한 사항</h2>
      <p>어떠한 경우에도 ${BRAND_NAME} 또는 그 공급업체는 당사 웹사이트의 자료 사용 또는 사용 불능으로 인해 발생하는 손해에 대해 책임을 지지 않습니다.</p>
    `,
  },
};

export const faqContent = {
  en: {
    title: "Frequently Asked Questions",
    content: `
      <h2>General Questions</h2>
      
      <h3>What is ${BRAND_NAME}?</h3>
      <p>${BRAND_NAME} is a B2B supplier of premium poker kits and accessories for wholesale buyers. We support bulk orders, OEM/ODM customization, and private label packaging.</p>
      
      <h3>How can I place an order?</h3>
      <p>Please contact us through our contact form or email us directly at ${CONTACT_EMAIL} with your requirements.</p>
      
      <h3>What is the minimum order quantity?</h3>
      <p>Minimum order quantities vary by product. Please contact us for specific details.</p>
      
      <h2>Shipping & Delivery</h2>
      
      <h3>Do you ship internationally?</h3>
      <p>Yes, we ship to customers worldwide.</p>
      
      <h3>How long does shipping take?</h3>
      <p>Shipping times vary depending on your location. Typically 7-14 business days for international orders.</p>
    `,
  },
  es: {
    title: "Preguntas Frecuentes",
    content: `
      <h2>Preguntas Generales</h2>
      
      <h3>¿Qué es ${BRAND_NAME}?</h3>
      <p>${BRAND_NAME} es un proveedor B2B de kits de póker y accesorios para compradores mayoristas. Ofrecemos pedidos al por mayor, personalización OEM/ODM y empaque de marca privada.</p>
      
      <h3>¿Cómo puedo realizar un pedido?</h3>
      <p>Por favor contáctenos a través de nuestro formulario de contacto o envíenos un correo electrónico directamente a ${CONTACT_EMAIL} con sus requisitos.</p>
      
      <h3>¿Cuál es la cantidad mínima de pedido?</h3>
      <p>Las cantidades mínimas de pedido varían según el producto. Por favor contáctenos para obtener detalles específicos.</p>
      
      <h2>Envío y Entrega</h2>
      
      <h3>¿Realizan envíos internacionales?</h3>
      <p>Sí, enviamos a clientes en todo el mundo.</p>
      
      <h3>¿Cuánto tiempo tarda el envío?</h3>
      <p>Los tiempos de envío varían según su ubicación. Típicamente 7-14 días hábiles para pedidos internacionales.</p>
    `,
  },
  fr: {
    title: "Questions Fréquemment Posées",
    content: `
      <h2>Questions Générales</h2>
      
      <h3>Qu'est-ce que ${BRAND_NAME}?</h3>
      <p>${BRAND_NAME} est un fournisseur B2B de kits de poker et d'accessoires pour les acheteurs en gros. Nous prenons en charge les commandes en volume, la personnalisation OEM/ODM et les emballages en marque blanche.</p>
      
      <h3>Comment puis-je passer une commande?</h3>
      <p>Veuillez nous contacter via notre formulaire de contact ou nous envoyer un e-mail directement à ${CONTACT_EMAIL} avec vos besoins.</p>
      
      <h3>Quelle est la quantité minimale de commande?</h3>
      <p>Les quantités minimales de commande varient selon le produit. Veuillez nous contacter pour des détails spécifiques.</p>
      
      <h2>Expédition et Livraison</h2>
      
      <h3>Livrez-vous à l'international?</h3>
      <p>Oui, nous expédions aux clients du monde entier.</p>
      
      <h3>Combien de temps prend la livraison?</h3>
      <p>Les délais d'expédition varient selon votre emplacement. Généralement 7-14 jours ouvrables pour les commandes internationales.</p>
    `,
  },
  de: {
    title: "Häufig Gestellte Fragen",
    content: `
      <h2>Allgemeine Fragen</h2>
      
      <h3>Was ist ${BRAND_NAME}?</h3>
      <p>${BRAND_NAME} ist ein B2B-Lieferant für hochwertige Poker-Kits und Zubehör für Großhandelskunden. Wir unterstützen Großbestellungen, OEM/ODM-Anpassungen und Private-Label-Verpackungen.</p>
      
      <h3>Wie kann ich eine Bestellung aufgeben?</h3>
      <p>Bitte kontaktieren Sie uns über unser Kontaktformular oder senden Sie uns direkt eine E-Mail an ${CONTACT_EMAIL} mit Ihren Anforderungen.</p>
      
      <h3>Was ist die Mindestbestellmenge?</h3>
      <p>Die Mindestbestellmengen variieren je nach Produkt. Bitte kontaktieren Sie uns für spezifische Details.</p>
      
      <h2>Versand und Lieferung</h2>
      
      <h3>Versenden Sie international?</h3>
      <p>Ja, wir versenden an Kunden weltweit.</p>
      
      <h3>Wie lange dauert der Versand?</h3>
      <p>Die Versandzeiten variieren je nach Ihrem Standort. Typischerweise 7-14 Werktage für internationale Bestellungen.</p>
    `,
  },
  ja: {
    title: "よくあるご質問",
    content: `
      <h2>一般的な質問</h2>
      
      <h3>${BRAND_NAME}とは何ですか？</h3>
      <p>${BRAND_NAME}は、卸売バイヤー向けのポーカーキットおよび関連アクセサリーのB2Bサプライヤーです。大量発注、OEM/ODMカスタマイズ、プライベートラベル包装に対応しています。</p>
      
      <h3>注文するにはどうすればよいですか？</h3>
      <p>お問い合わせフォームからご連絡いただくか、${CONTACT_EMAIL}まで直接メールでご要望をお送りください。</p>
      
      <h3>最小注文数量はいくつですか？</h3>
      <p>最小注文数量は製品によって異なります。詳細についてはお問い合わせください。</p>
      
      <h2>配送と納品</h2>
      
      <h3>国際配送は行っていますか？</h3>
      <p>はい、世界中のお客様に配送しています。</p>
      
      <h3>配送にはどのくらいかかりますか？</h3>
      <p>配送時間はお客様の所在地によって異なります。通常、国際注文の場合は7〜14営業日です。</p>
    `,
  },
  ko: {
    title: "자주 묻는 질문",
    content: `
      <h2>일반 질문</h2>
      
      <h3>${BRAND_NAME}은 무엇인가요?</h3>
      <p>${BRAND_NAME}은 도매 구매자를 위한 프리미엄 포커 키트 및 액세서리 B2B 공급업체입니다. 대량 주문, OEM/ODM 맞춤 제작, 프라이빗 라벨 포장에 대응합니다.</p>
      
      <h3>주문은 어떻게 하나요?</h3>
      <p>문의 양식을 통해 연락하시거나 ${CONTACT_EMAIL}으로 직접 이메일을 보내주시면 됩니다.</p>
      
      <h3>최소 주문 수량은 얼마인가요?</h3>
      <p>최소 주문 수량은 제품에 따라 다릅니다. 자세한 내용은 문의해 주세요.</p>
      
      <h2>배송 및 배달</h2>
      
      <h3>국제 배송을 하나요?</h3>
      <p>네, 전 세계 고객에게 배송합니다.</p>
      
      <h3>배송은 얼마나 걸리나요?</h3>
      <p>배송 시간은 위치에 따라 다릅니다. 일반적으로 국제 주문의 경우 7-14 영업일이 소요됩니다.</p>
    `,
  },
};

export const shippingContent = {
  en: {
    title: "Shipping Policy",
    content: `
      <p>Last updated: December 16, 2025</p>
      
      <h2>Shipping Methods</h2>
      <p>We offer various shipping methods to meet your needs, including express and standard shipping options.</p>
      
      <h2>Shipping Times</h2>
      <p>Standard shipping: 7-14 business days<br>Express shipping: 3-5 business days</p>
      
      <h2>Shipping Costs</h2>
      <p>Shipping costs are calculated based on order weight, dimensions, and destination. Contact us for a quote.</p>
      
      <h2>International Shipping</h2>
      <p>We ship worldwide. International customers are responsible for any customs duties or taxes.</p>
    `,
  },
  es: {
    title: "Política de Envío",
    content: `
      <p>Última actualización: 16 de diciembre de 2025</p>
      
      <h2>Métodos de Envío</h2>
      <p>Ofrecemos varios métodos de envío para satisfacer sus necesidades, incluidas opciones de envío exprés y estándar.</p>
      
      <h2>Tiempos de Envío</h2>
      <p>Envío estándar: 7-14 días hábiles<br>Envío exprés: 3-5 días hábiles</p>
      
      <h2>Costos de Envío</h2>
      <p>Los costos de envío se calculan en función del peso, las dimensiones y el destino del pedido. Contáctenos para obtener una cotización.</p>
      
      <h2>Envío Internacional</h2>
      <p>Enviamos a todo el mundo. Los clientes internacionales son responsables de los aranceles aduaneros o impuestos.</p>
    `,
  },
  fr: {
    title: "Politique d'Expédition",
    content: `
      <p>Dernière mise à jour: 16 décembre 2025</p>
      
      <h2>Méthodes d'Expédition</h2>
      <p>Nous proposons diverses méthodes d'expédition pour répondre à vos besoins, y compris des options d'expédition express et standard.</p>
      
      <h2>Délais d'Expédition</h2>
      <p>Expédition standard: 7-14 jours ouvrables<br>Expédition express: 3-5 jours ouvrables</p>
      
      <h2>Frais d'Expédition</h2>
      <p>Les frais d'expédition sont calculés en fonction du poids, des dimensions et de la destination de la commande. Contactez-nous pour un devis.</p>
      
      <h2>Expédition Internationale</h2>
      <p>Nous expédions dans le monde entier. Les clients internationaux sont responsables des droits de douane ou des taxes.</p>
    `,
  },
  de: {
    title: "Versandrichtlinie",
    content: `
      <p>Letzte Aktualisierung: 16. Dezember 2025</p>
      
      <h2>Versandmethoden</h2>
      <p>Wir bieten verschiedene Versandmethoden an, um Ihre Bedürfnisse zu erfüllen, einschließlich Express- und Standardversandoptionen.</p>
      
      <h2>Versandzeiten</h2>
      <p>Standardversand: 7-14 Werktage<br>Expressversand: 3-5 Werktage</p>
      
      <h2>Versandkosten</h2>
      <p>Die Versandkosten werden basierend auf Gewicht, Abmessungen und Zielort der Bestellung berechnet. Kontaktieren Sie uns für ein Angebot.</p>
      
      <h2>Internationaler Versand</h2>
      <p>Wir versenden weltweit. Internationale Kunden sind für Zollgebühren oder Steuern verantwortlich.</p>
    `,
  },
  ja: {
    title: "配送ポリシー",
    content: `
      <p>最終更新日: 2025年12月16日</p>
      
      <h2>配送方法</h2>
      <p>お客様のニーズに合わせて、速達および標準配送オプションを含むさまざまな配送方法を提供しています。</p>
      
      <h2>配送時間</h2>
      <p>標準配送: 7-14営業日<br>速達配送: 3-5営業日</p>
      
      <h2>配送料</h2>
      <p>配送料は注文の重量、寸法、および配送先に基づいて計算されます。見積もりについてはお問い合わせください。</p>
      
      <h2>国際配送</h2>
      <p>世界中に配送しています。国際的なお客様は関税や税金の責任を負います。</p>
    `,
  },
  ko: {
    title: "배송 정책",
    content: `
      <p>최종 업데이트: 2025년 12월 16일</p>
      
      <h2>배송 방법</h2>
      <p>고객의 요구를 충족시키기 위해 특급 및 표준 배송 옵션을 포함한 다양한 배송 방법을 제공합니다.</p>
      
      <h2>배송 시간</h2>
      <p>표준 배송: 7-14 영업일<br>특급 배송: 3-5 영업일</p>
      
      <h2>배송 비용</h2>
      <p>배송 비용은 주문 무게, 치수 및 목적지를 기준으로 계산됩니다. 견적은 문의해 주세요.</p>
      
      <h2>국제 배송</h2>
      <p>전 세계로 배송합니다. 국제 고객은 관세 또는 세금에 대한 책임이 있습니다.</p>
    `,
  },
};

export const returnContent = {
  en: {
    title: "Return Policy",
    content: `
      <p>Last updated: December 16, 2025</p>
      
      <h2>Return Eligibility</h2>
      <p>Items must be unused, in original packaging, and returned within 30 days of receipt.</p>
      
      <h2>Return Process</h2>
      <p>Contact us at ${CONTACT_EMAIL} to initiate a return. We will provide return instructions and address.</p>
      
      <h2>Refunds</h2>
      <p>Refunds will be processed within 7-10 business days after we receive the returned items.</p>
      
      <h2>Non-Returnable Items</h2>
      <p>Custom orders and clearance items are final sale and cannot be returned.</p>
    `,
  },
  es: {
    title: "Política de Devolución",
    content: `
      <p>Última actualización: 16 de diciembre de 2025</p>
      
      <h2>Elegibilidad para Devolución</h2>
      <p>Los artículos deben estar sin usar, en su embalaje original y devolverse dentro de los 30 días posteriores a la recepción.</p>
      
      <h2>Proceso de Devolución</h2>
      <p>Contáctenos en ${CONTACT_EMAIL} para iniciar una devolución. Le proporcionaremos instrucciones y dirección de devolución.</p>
      
      <h2>Reembolsos</h2>
      <p>Los reembolsos se procesarán dentro de 7-10 días hábiles después de que recibamos los artículos devueltos.</p>
      
      <h2>Artículos No Retornables</h2>
      <p>Los pedidos personalizados y los artículos en liquidación son venta final y no se pueden devolver.</p>
    `,
  },
  fr: {
    title: "Politique de Retour",
    content: `
      <p>Dernière mise à jour: 16 décembre 2025</p>
      
      <h2>Éligibilité au Retour</h2>
      <p>Les articles doivent être inutilisés, dans leur emballage d'origine et retournés dans les 30 jours suivant la réception.</p>
      
      <h2>Processus de Retour</h2>
      <p>Contactez-nous à ${CONTACT_EMAIL} pour initier un retour. Nous fournirons des instructions et une adresse de retour.</p>
      
      <h2>Remboursements</h2>
      <p>Les remboursements seront traités dans les 7-10 jours ouvrables après réception des articles retournés.</p>
      
      <h2>Articles Non Retournables</h2>
      <p>Les commandes personnalisées et les articles en liquidation sont des ventes finales et ne peuvent pas être retournés.</p>
    `,
  },
  de: {
    title: "Rückgabebedingungen",
    content: `
      <p>Letzte Aktualisierung: 16. Dezember 2025</p>
      
      <h2>Rückgabeberechtigung</h2>
      <p>Artikel müssen unbenutzt, in Originalverpackung sein und innerhalb von 30 Tagen nach Erhalt zurückgegeben werden.</p>
      
      <h2>Rückgabeprozess</h2>
      <p>Kontaktieren Sie uns unter ${CONTACT_EMAIL}, um eine Rücksendung einzuleiten. Wir stellen Rücksendeanweisungen und Adresse bereit.</p>
      
      <h2>Rückerstattungen</h2>
      <p>Rückerstattungen werden innerhalb von 7-10 Werktagen nach Erhalt der zurückgesendeten Artikel bearbeitet.</p>
      
      <h2>Nicht Rückgabefähige Artikel</h2>
      <p>Kundenspezifische Bestellungen und Ausverkaufsartikel sind Endverkauf und können nicht zurückgegeben werden.</p>
    `,
  },
  ja: {
    title: "返品ポリシー",
    content: `
      <p>最終更新日: 2025年12月16日</p>
      
      <h2>返品資格</h2>
      <p>商品は未使用で、元のパッケージに入っており、受領後30日以内に返品する必要があります。</p>
      
      <h2>返品プロセス</h2>
      <p>返品を開始するには、${CONTACT_EMAIL}までご連絡ください。返品の手順と住所をお知らせします。</p>
      
      <h2>返金</h2>
      <p>返品された商品を受け取ってから7〜10営業日以内に返金が処理されます。</p>
      
      <h2>返品不可商品</h2>
      <p>カスタムオーダーおよびクリアランス商品は最終販売であり、返品できません。</p>
    `,
  },
  ko: {
    title: "반품 정책",
    content: `
      <p>최종 업데이트: 2025년 12월 16일</p>
      
      <h2>반품 자격</h2>
      <p>상품은 미사용 상태여야 하며, 원래 포장 상태로 수령 후 30일 이내에 반품해야 합니다.</p>
      
      <h2>반품 프로세스</h2>
      <p>반품을 시작하려면 ${CONTACT_EMAIL}으로 문의하세요. 반품 지침과 주소를 제공해 드립니다.</p>
      
      <h2>환불</h2>
      <p>반품된 상품을 받은 후 7-10 영업일 이내에 환불이 처리됩니다.</p>
      
      <h2>반품 불가 상품</h2>
      <p>맞춤 주문 및 정리 상품은 최종 판매이며 반품할 수 없습니다.</p>
    `,
  },
};

export function getContent(type, locale = "en") {
  const contentMap = {
    privacy: privacyContent,
    terms: termsContent,
    faq: faqContent,
    shipping: shippingContent,
    return: returnContent,
  };

  const content = contentMap[type];
  if (!content) {
    return { title: "Content Not Found", content: "<p>Content not available.</p>" };
  }

  return content[locale] || content.en;
}
