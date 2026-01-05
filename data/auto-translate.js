// 自动翻译系统
// 这个文件会自动将原始数据翻译成多语言版本

import { products } from './products.js';
import { product } from './product.js';
import slugify from 'slugify';

// 翻译映射表
const translations = {
  // 产品分类翻译
  categoryTranslations: {
    en: {
      "Poker Equipment": "Poker Equipment",
      "Poker Chips": "Poker Chips",
      "Poker Table": "Poker Table"
    },
    es: {
      "Poker Equipment": "Equipo de póker",
      "Poker Chips": "Fichas de póker",
      "Poker Table": "Mesa de póker"
    },
    fr: {
      "Poker Equipment": "Équipement de poker",
      "Poker Chips": "Jetons de poker",
      "Poker Table": "Table de poker"
    },
    de: {
      "Poker Equipment": "Poker-Ausrüstung",
      "Poker Chips": "Pokerchips",
      "Poker Table": "Pokertisch"
    },
    ja: {
      "Poker Equipment": "ポーカー用品",
      "Poker Chips": "ポーカーチップ",
      "Poker Table": "ポーカーテーブル"
    },
    ko: {
      "Poker Equipment": "포커 장비",
      "Poker Chips": "포커 칩",
      "Poker Table": "포커 테이블"
    }
  },
  
  // 产品标题翻译
  productTitleTranslations: {
    en: {},
    es: {},
    fr: {},
    de: {},
    ja: {},
    ko: {}
  },

  // 通用文本翻译
  commonTranslations: {
    en: {
      "Products Collection": "Products Collection",
      "Discover our latest product collection, where we share insights, tips, and updates on the latest trends in the industry.": "Discover our latest product collection, where we share insights, tips, and updates on the latest trends in the industry.",
      "Dolls brings imagination to life with stylish, collectible figures that blend playful charm, artistic design, and timeless appeal—crafted to be loved, displayed, and desired.": "Dolls brings imagination to life with stylish, collectible figures that blend playful charm, artistic design, and timeless appeal—crafted to be loved, displayed, and desired.",
      "Animals Toy sparks wonder with adorable, collectible figures inspired by the wild—where playful design meets heartfelt charm, made to be treasured, shared, and displayed": "Animals Toy sparks wonder with adorable, collectible figures inspired by the wild—where playful design meets heartfelt charm, made to be treasured, shared, and displayed",
      "Charm & Creativity: Our designs combine playfulness and artistic flair, making each product both delightful and display-worthy": "Charm & Creativity: Our designs combine playfulness and artistic flair, making each product both delightful and display-worthy",
      "Versatile Appeal: From home décor to thoughtful gifts, our collection fits into every lifestyle and occasion": "Versatile Appeal: From home décor to thoughtful gifts, our collection fits into every lifestyle and occasion",
      "Sustainable Practices: Our commitment to sustainability is reflected in eco-conscious materials and mindful production methods": "Sustainable Practices: Our commitment to sustainability is reflected in eco-conscious materials and mindful production methods",
      "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved": "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved",
      "Comfort and Style: Our blind boxes combine the thrill of mystery with bold, artistic character design – perfect for collectors and fans alike": "Comfort and Style: Our blind boxes combine the thrill of mystery with bold, artistic character design – perfect for collectors and fans alike",
      "Versatile Appeal: From shelf displays to desk décor, our figures bring charm to any space and make unforgettable gifts": "Versatile Appeal: From shelf displays to desk décor, our figures bring charm to any space and make unforgettable gifts",
      "Sustainable Practices: We're committed to eco-conscious packaging and responsible production, adding joy to your collection with less impact on the planet": "Sustainable Practices: We're committed to eco-conscious packaging and responsible production, adding joy to your collection with less impact on the planet",
      "Exceptional Craftsmanship: Every Dolls figure is thoughtfully sculpted with premium materials and fine detailing, offering a collectible that's made to be cherished for years": "Exceptional Craftsmanship: Every Dolls figure is thoughtfully sculpted with premium materials and fine detailing, offering a collectible that's made to be cherished for years",
      "Art Meets Emotion: Blending elegant aesthetics with expressive character design, Dolls brings heartfelt charm and modern style to every mystery unboxing experience": "Art Meets Emotion: Blending elegant aesthetics with expressive character design, Dolls brings heartfelt charm and modern style to every mystery unboxing experience",
      "Display-Ready Magic: Whether on your shelf, workspace, or as a meaningful gift, Dolls figures add a touch of personality and beauty to any space": "Display-Ready Magic: Whether on your shelf, workspace, or as a meaningful gift, Dolls figures add a touch of personality and beauty to any space",
      "Mindful Creation: We embrace sustainable packaging and responsible production to deliver joy that feels good—for you and the planet": "Mindful Creation: We embrace sustainable packaging and responsible production to deliver joy that feels good—for you and the planet",
      "Premium Craftsmanship: Every Animals Toy blind box is made with high-quality materials and intricate details, built to stand the test of time—and affection": "Premium Craftsmanship: Every Animals Toy blind box is made with high-quality materials and intricate details, built to stand the test of time—and affection",
      "Whimsical Design: Each figure captures the spirit of the wild with playful, imaginative character design that surprises and delights with every unboxing": "Whimsical Design: Each figure captures the spirit of the wild with playful, imaginative character design that surprises and delights with every unboxing",
      "Everyday Delight: From cozy shelves to creative workspaces, Animals Toy figures add a dash of personality and joy—perfect for display or gifting": "Everyday Delight: From cozy shelves to creative workspaces, Animals Toy figures add a dash of personality and joy—perfect for display or gifting",
      "Eco-Friendly Promise: We care about the world our animals come from, which is why we use sustainable packaging and ethical production practices in every stepEco-Friendly Promise: Inspired by the beauty of the animal world, we're committed to sustainable packaging and mindful production—because caring for nature starts with the small things": "Eco-Friendly Promise: We care about the world our animals come from, which is why we use sustainable packaging and ethical production practices in every stepEco-Friendly Promise: Inspired by the beauty of the animal world, we're committed to sustainable packaging and mindful production—because caring for nature starts with the small things",
      "Learn More": "Learn More",
      "Read More": "Read More",
      "Recommended Products": "Recommended Products",
      "Versatile Doll Compatibility": "Versatile Doll Compatibility",
      "Durable & High-Quality Material": "Durable & High-Quality Material",
      "Perfect Gift Appeal": "Perfect Gift Appeal",
      "Multi-Functional Use Opportunities": "Multi-Functional Use Opportunities",
      "Constructed from premium cotton fabric, these doll clothes are not only durable and wear-resistant but also maintain their vibrant colors and exquisite designs over time, allowing your customers to invest in items that will last and retain their appeal.": "Constructed from premium cotton fabric, these doll clothes are not only durable and wear-resistant but also maintain their vibrant colors and exquisite designs over time, allowing your customers to invest in items that will last and retain their appeal."
    },
    es: {
      "Products Collection": "Colección de Productos",
      "Discover our latest product collection, where we share insights, tips, and updates on the latest trends in the industry.": "Descubre nuestra última colección de productos, donde compartimos ideas, consejos y actualizaciones sobre las últimas tendencias de la industria.",
      "Dolls brings imagination to life with stylish, collectible figures that blend playful charm, artistic design, and timeless appeal—crafted to be loved, displayed, and desired.": "Dolls da vida a la imaginación con figuras coleccionables elegantes que combinan encanto juguetón, diseño artístico y atractivo atemporal—elaboradas para ser amadas, exhibidas y deseadas.",
      "Animals Toy sparks wonder with adorable, collectible figures inspired by the wild—where playful design meets heartfelt charm, made to be treasured, shared, and displayed": "Animals Toy despierta asombro con figuras coleccionables adorables inspiradas en la naturaleza salvaje—donde el diseño juguetón se encuentra con el encanto sincero, hecho para ser atesorado, compartido y exhibido",
      "Charm & Creativity: Our designs combine playfulness and artistic flair, making each product both delightful and display-worthy": "Encanto y Creatividad: Nuestros diseños combinan juguetón y estilo artístico, haciendo que cada producto sea tanto encantador como digno de exhibición",
      "Versatile Appeal: From home décor to thoughtful gifts, our collection fits into every lifestyle and occasion": "Atractivo Versátil: Desde decoración del hogar hasta regalos considerados, nuestra colección se adapta a cada estilo de vida y ocasión",
      "Sustainable Practices: Our commitment to sustainability is reflected in eco-conscious materials and mindful production methods": "Prácticas Sostenibles: Nuestro compromiso con la sostenibilidad se refleja en materiales ecológicos y métodos de producción conscientes",
      "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved": "Calidad Excepcional: Aseguramos que cada figura de caja sorpresa esté elaborada con materiales premium y detalles precisos, construida para durar y ser amada",
      "Comfort and Style: Our blind boxes combine the thrill of mystery with bold, artistic character design – perfect for collectors and fans alike": "Comodidad y Estilo: Nuestras cajas sorpresa combinan la emoción del misterio con un diseño de personajes audaz y artístico – perfecto para coleccionistas y fanáticos por igual",
      "Versatile Appeal: From shelf displays to desk décor, our figures bring charm to any space and make unforgettable gifts": "Atractivo Versátil: Desde exhibiciones de estantería hasta decoración de escritorio, nuestras figuras aportan encanto a cualquier espacio y crean regalos inolvidables",
      "Sustainable Practices: We're committed to eco-conscious packaging and responsible production, adding joy to your collection with less impact on the planet": "Prácticas Sostenibles: Estamos comprometidos con empaques ecológicos y producción responsable, agregando alegría a tu colección con menos impacto en el planeta",
      "Exceptional Craftsmanship: Every Dolls figure is thoughtfully sculpted with premium materials and fine detailing, offering a collectible that's made to be cherished for years": "Artesanía Excepcional: Cada figura Dolls está cuidadosamente esculpida con materiales premium y detalles finos, ofreciendo un coleccionable hecho para ser apreciado durante años",
      "Art Meets Emotion: Blending elegant aesthetics with expressive character design, Dolls brings heartfelt charm and modern style to every mystery unboxing experience": "Arte Encuentra Emoción: Combinando estética elegante con diseño de personajes expresivo, Dolls aporta encanto sincero y estilo moderno a cada experiencia de desembalaje misterioso",
      "Display-Ready Magic: Whether on your shelf, workspace, or as a meaningful gift, Dolls figures add a touch of personality and beauty to any space": "Magia Lista para Exhibir: Ya sea en tu estantería, espacio de trabajo, o como un regalo significativo, las figuras Dolls agregan un toque de personalidad y belleza a cualquier espacio",
      "Mindful Creation: We embrace sustainable packaging and responsible production to deliver joy that feels good—for you and the planet": "Creación Consciente: Adoptamos empaques sostenibles y producción responsable para entregar alegría que se siente bien—para ti y el planeta",
      "Premium Craftsmanship: Every Animals Toy blind box is made with high-quality materials and intricate details, built to stand the test of time—and affection": "Artesanía Premium: Cada caja sorpresa Animals Toy está hecha con materiales de alta calidad y detalles intrincados, construida para resistir la prueba del tiempo—y el cariño",
      "Whimsical Design: Each figure captures the spirit of the wild with playful, imaginative character design that surprises and delights with every unboxing": "Diseño Caprichoso: Cada figura captura el espíritu de la naturaleza salvaje con diseño de personajes juguetón e imaginativo que sorprende y deleita con cada desembalaje",
      "Everyday Delight: From cozy shelves to creative workspaces, Animals Toy figures add a dash of personality and joy—perfect for display or gifting": "Deleite Cotidiano: Desde estanterías acogedoras hasta espacios de trabajo creativos, las figuras Animals Toy agregan una pizca de personalidad y alegría—perfectas para exhibir o regalar",
      "Eco-Friendly Promise: We care about the world our animals come from, which is why we use sustainable packaging and ethical production practices in every stepEco-Friendly Promise: Inspired by the beauty of the animal world, we're committed to sustainable packaging and mindful production—because caring for nature starts with the small things": "Promesa Ecológica: Nos preocupamos por el mundo del que vienen nuestros animales, por eso usamos empaques sostenibles y prácticas de producción éticas en cada paso Promesa Ecológica: Inspirados por la belleza del mundo animal, estamos comprometidos con empaques sostenibles y producción consciente—porque cuidar la naturaleza comienza con las pequeñas cosas",
      "Learn More": "Aprender Más",
      "Read More": "Leer Más",
      "Recommended Products": "Productos Recomendados",
      "Versatile Doll Compatibility": "Compatibilidad Versátil con Muñecas",
      "Durable & High-Quality Material": "Material Duradero y de Alta Calidad",
      "Perfect Gift Appeal": "Atractivo Perfecto para Regalos",
      "Multi-Functional Use Opportunities": "Oportunidades de Uso Multifuncional",
      "Constructed from premium cotton fabric, these doll clothes are not only durable and wear-resistant but also maintain their vibrant colors and exquisite designs over time, allowing your customers to invest in items that will last and retain their appeal.": "Construido con tela de algodón premium, esta ropa para muñecas no solo es duradera y resistente al desgaste, sino que también mantiene sus colores vibrantes y diseños exquisitos con el tiempo, permitiendo que sus clientes inviertan en artículos que durarán y mantendrán su atractivo."
    },
    fr: {
      "Products Collection": "Collection de Produits",
      "Discover our latest product collection, where we share insights, tips, and updates on the latest trends in the industry.": "Découvrez notre dernière collection de produits, où nous partageons des idées, des conseils et des mises à jour sur les dernières tendances de l'industrie.",
      "Dolls brings imagination to life with stylish, collectible figures that blend playful charm, artistic design, and timeless appeal—crafted to be loved, displayed, and desired.": "Dolls donne vie à l'imagination avec des figurines collectionnables élégantes qui mélangent charme ludique, design artistique et attrait intemporel—fabriquées pour être aimées, exposées et désirées.",
      "Animals Toy sparks wonder with adorable, collectible figures inspired by the wild—where playful design meets heartfelt charm, made to be treasured, shared, and displayed": "Animals Toy suscite l'émerveillement avec des figurines collectionnables adorables inspirées de la nature sauvage—où le design ludique rencontre le charme sincère, fait pour être chéri, partagé et exposé",
      "Charm & Creativity: Our designs combine playfulness and artistic flair, making each product both delightful and display-worthy": "Charme et Créativité: Nos designs combinent ludisme et flair artistique, rendant chaque produit à la fois délicieux et digne d'être exposé",
      "Versatile Appeal: From home décor to thoughtful gifts, our collection fits into every lifestyle and occasion": "Attrait Polyvalent: De la décoration maison aux cadeaux attentionnés, notre collection s'adapte à chaque style de vie et occasion",
      "Sustainable Practices: Our commitment to sustainability is reflected in eco-conscious materials and mindful production methods": "Pratiques Durables: Notre engagement envers la durabilité se reflète dans des matériaux éco-conscients et des méthodes de production réfléchies",
      "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved": "Qualité Exceptionnelle: Nous nous assurons que chaque figurine de boîte surprise est fabriquée avec des matériaux premium et des détails précis, construite pour durer et être aimée",
      "Comfort and Style: Our blind boxes combine the thrill of mystery with bold, artistic character design – perfect for collectors and fans alike": "Confort et Style: Nos boîtes surprises combinent le frisson du mystère avec un design de personnage audacieux et artistique – parfait pour les collectionneurs et fans",
      "Versatile Appeal: From shelf displays to desk décor, our figures bring charm to any space and make unforgettable gifts": "Attrait Polyvalent: Des expositions d'étagères à la décoration de bureau, nos figurines apportent du charme à tout espace et créent des cadeaux inoubliables",
      "Sustainable Practices: We're committed to eco-conscious packaging and responsible production, adding joy to your collection with less impact on the planet": "Pratiques Durables: Nous nous engageons pour un emballage éco-conscient et une production responsable, ajoutant de la joie à votre collection avec moins d'impact sur la planète",
      "Exceptional Craftsmanship: Every Dolls figure is thoughtfully sculpted with premium materials and fine detailing, offering a collectible that's made to be cherished for years": "Artisanat Exceptionnel: Chaque figurine Dolls est soigneusement sculptée avec des matériaux premium et des détails fins, offrant un collectionnable fait pour être chéri pendant des années",
      "Art Meets Emotion: Blending elegant aesthetics with expressive character design, Dolls brings heartfelt charm and modern style to every mystery unboxing experience": "L'Art Rencontre l'Émotion: Mélangeant esthétique élégante avec design de personnage expressif, Dolls apporte charme sincère et style moderne à chaque expérience de déballage mystérieux",
      "Display-Ready Magic: Whether on your shelf, workspace, or as a meaningful gift, Dolls figures add a touch of personality and beauty to any space": "Magie Prête à Exposer: Que ce soit sur votre étagère, espace de travail, ou comme cadeau significatif, les figurines Dolls ajoutent une touche de personnalité et de beauté à tout espace",
      "Mindful Creation: We embrace sustainable packaging and responsible production to deliver joy that feels good—for you and the planet": "Création Consciente: Nous adoptons un emballage durable et une production responsable pour livrer de la joie qui fait du bien—pour vous et la planète",
      "Premium Craftsmanship: Every Animals Toy blind box is made with high-quality materials and intricate details, built to stand the test of time—and affection": "Artisanat Premium: Chaque boîte surprise Animals Toy est faite avec des matériaux de haute qualité et des détails complexes, construite pour résister à l'épreuve du temps—et de l'affection",
      "Whimsical Design: Each figure captures the spirit of the wild with playful, imaginative character design that surprises and delights with every unboxing": "Design Fantaisiste: Chaque figurine capture l'esprit de la nature sauvage avec un design de personnage ludique et imaginatif qui surprend et ravit à chaque déballage",
      "Everyday Delight: From cozy shelves to creative workspaces, Animals Toy figures add a dash of personality and joy—perfect for display or gifting": "Délices Quotidiens: Des étagères douillettes aux espaces de travail créatifs, les figurines Animals Toy ajoutent une pincée de personnalité et de joie—parfaites pour l'exposition ou les cadeaux",
      "Eco-Friendly Promise: We care about the world our animals come from, which is why we use sustainable packaging and ethical production practices in every stepEco-Friendly Promise: Inspired by the beauty of the animal world, we're committed to sustainable packaging and mindful production—because caring for nature starts with the small things": "Promesse Écologique: Nous nous soucions du monde d'où viennent nos animaux, c'est pourquoi nous utilisons un emballage durable et des pratiques de production éthiques à chaque étape Promesse Écologique: Inspirés par la beauté du monde animal, nous nous engageons pour un emballage durable et une production consciente—parce que prendre soin de la nature commence par les petites choses",
      "Learn More": "En Savoir Plus",
      "Read More": "Lire Plus",
      "Recommended Products": "Produits Recommandés",
      "Versatile Doll Compatibility": "Compatibilité Polyvalente avec les Poupées",
      "Durable & High-Quality Material": "Matériau Durable et de Haute Qualité",
      "Perfect Gift Appeal": "Attrait Parfait pour Cadeaux",
      "Multi-Functional Use Opportunities": "Opportunités d'Usage Multifonctionnel",
      "Constructed from premium cotton fabric, these doll clothes are not only durable and wear-resistant but also maintain their vibrant colors and exquisite designs over time, allowing your customers to invest in items that will last and retain their appeal.": "Construits en tissu de coton premium, ces vêtements de poupée sont non seulement durables et résistants à l'usure mais maintiennent aussi leurs couleurs vives et leurs designs exquis au fil du temps, permettant à vos clients d'investir dans des articles qui dureront et conserveront leur attrait."
    },
    de: {
      "Products Collection": "Produktkollektion",
      "Discover our latest product collection, where we share insights, tips, and updates on the latest trends in the industry.": "Entdecken Sie unsere neueste Produktkollektion, wo wir Einblicke, Tipps und Updates zu den neuesten Trends der Branche teilen.",
      "Dolls brings imagination to life with stylish, collectible figures that blend playful charm, artistic design, and timeless appeal—crafted to be loved, displayed, and desired.": "Dolls erweckt die Fantasie zum Leben mit stilvollen, sammelbaren Figuren, die verspielten Charme, künstlerisches Design und zeitlose Anziehungskraft verbinden—handwerklich gefertigt, um geliebt, ausgestellt und begehrt zu werden.",
      "Animals Toy sparks wonder with adorable, collectible figures inspired by the wild—where playful design meets heartfelt charm, made to be treasured, shared, and displayed": "Animals Toy weckt Staunen mit entzückenden, sammelbaren Figuren, inspiriert von der Wildnis—wo verspieltes Design auf herzlichen Charme trifft, gemacht, um geschätzt, geteilt und ausgestellt zu werden",
      "Charm & Creativity: Our designs combine playfulness and artistic flair, making each product both delightful and display-worthy": "Charme & Kreativität: Unsere Designs verbinden Verspieltheit und künstlerischen Flair, wodurch jedes Produkt sowohl entzückend als auch ausstellungswürdig wird",
      "Versatile Appeal: From home décor to thoughtful gifts, our collection fits into every lifestyle and occasion": "Vielseitige Anziehungskraft: Von Heimdekoration bis hin zu durchdachten Geschenken passt unsere Kollektion zu jedem Lebensstil und jeder Gelegenheit",
      "Sustainable Practices: Our commitment to sustainability is reflected in eco-conscious materials and mindful production methods": "Nachhaltige Praktiken: Unser Engagement für Nachhaltigkeit spiegelt sich in umweltbewussten Materialien und achtsamen Produktionsmethoden wider",
      "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved": "Außergewöhnliche Qualität: Wir stellen sicher, dass jede Blind Box Figur mit Premium-Materialien und präzisen Details gefertigt wird, gebaut, um zu halten und geliebt zu werden",
      "Comfort and Style: Our blind boxes combine the thrill of mystery with bold, artistic character design – perfect for collectors and fans alike": "Komfort und Stil: Unsere Blind Boxes verbinden den Nervenkitzel des Geheimnisses mit mutigem, künstlerischem Charakterdesign – perfekt für Sammler und Fans gleichermaßen",
      "Versatile Appeal: From shelf displays to desk décor, our figures bring charm to any space and make unforgettable gifts": "Vielseitige Anziehungskraft: Von Regalausstellungen bis hin zu Schreibtischdekoration bringen unsere Figuren Charme in jeden Raum und machen unvergessliche Geschenke",
      "Sustainable Practices: We're committed to eco-conscious packaging and responsible production, adding joy to your collection with less impact on the planet": "Nachhaltige Praktiken: Wir sind verpflichtet zu umweltbewusster Verpackung und verantwortungsvoller Produktion, fügen Freude zu Ihrer Sammlung mit weniger Auswirkungen auf den Planeten hinzu",
      "Exceptional Craftsmanship: Every Dolls figure is thoughtfully sculpted with premium materials and fine detailing, offering a collectible that's made to be cherished for years": "Außergewöhnliche Handwerkskunst: Jede Dolls-Figur ist durchdacht mit Premium-Materialien und feinen Details gefertigt und bietet ein Sammlerstück, das dazu gemacht ist, jahrelang geschätzt zu werden",
      "Art Meets Emotion: Blending elegant aesthetics with expressive character design, Dolls brings heartfelt charm and modern style to every mystery unboxing experience": "Kunst trifft Emotion: Durch die Verbindung eleganter Ästhetik mit ausdrucksvollem Charakterdesign bringt Dolls herzlichen Charme und modernen Stil zu jeder Mystery-Unboxing-Erfahrung",
      "Display-Ready Magic: Whether on your shelf, workspace, or as a meaningful gift, Dolls figures add a touch of personality and beauty to any space": "Ausstellungsbereite Magie: Ob auf Ihrem Regal, Arbeitsplatz oder als bedeutungsvolles Geschenk, Dolls-Figuren fügen jedem Raum eine Prise Persönlichkeit und Schönheit hinzu",
      "Mindful Creation: We embrace sustainable packaging and responsible production to deliver joy that feels good—for you and the planet": "Achtsame Schöpfung: Wir umarmen nachhaltige Verpackung und verantwortungsvolle Produktion, um Freude zu liefern, die sich gut anfühlt—für Sie und den Planeten",
      "Premium Craftsmanship: Every Animals Toy blind box is made with high-quality materials and intricate details, built to stand the test of time—and affection": "Premium-Handwerkskunst: Jede Animals Toy Blind Box ist aus hochwertigen Materialien und komplizierten Details gefertigt, gebaut, um der Zeit—und der Zuneigung—standzuhalten",
      "Whimsical Design: Each figure captures the spirit of the wild with playful, imaginative character design that surprises and delights with every unboxing": "Verspieltes Design: Jede Figur fängt den Geist der Wildnis mit verspieltem, fantasievollem Charakterdesign ein, das bei jedem Unboxing überrascht und erfreut",
      "Everyday Delight: From cozy shelves to creative workspaces, Animals Toy figures add a dash of personality and joy—perfect for display or gifting": "Alltägliche Freude: Von gemütlichen Regalen bis hin zu kreativen Arbeitsplätzen fügen Animals Toy-Figuren eine Prise Persönlichkeit und Freude hinzu—perfekt zum Ausstellen oder Verschenken",
      "Eco-Friendly Promise: We care about the world our animals come from, which is why we use sustainable packaging and ethical production practices in every stepEco-Friendly Promise: Inspired by the beauty of the animal world, we're committed to sustainable packaging and mindful production—because caring for nature starts with the small things": "Umweltfreundliches Versprechen: Wir kümmern uns um die Welt, aus der unsere Tiere kommen, deshalb verwenden wir nachhaltige Verpackung und ethische Produktionspraktiken in jedem Schritt Umweltfreundliches Versprechen: Inspiriert von der Schönheit der Tierwelt sind wir verpflichtet zu nachhaltiger Verpackung und achtsamer Produktion—weil die Fürsorge für die Natur mit den kleinen Dingen beginnt",
      "Learn More": "Mehr Erfahren", 
      "Read More": "Mehr Lesen",
      "Recommended Products": "Empfohlene Produkte",
      "Versatile Doll Compatibility": "Vielseitige Puppenkompatibilität",
      "Durable & High-Quality Material": "Langlebiges und Hochwertiges Material",
      "Perfect Gift Appeal": "Perfekte Geschenk-Anziehungskraft",
      "Multi-Functional Use Opportunities": "Multifunktionale Nutzungsmöglichkeiten",
      "Constructed from premium cotton fabric, these doll clothes are not only durable and wear-resistant but also maintain their vibrant colors and exquisite designs over time, allowing your customers to invest in items that will last and retain their appeal.": "Aus hochwertigem Baumwollstoff hergestellt, sind diese Puppenkleider nicht nur langlebig und verschleißfest, sondern behalten auch ihre lebendigen Farben und exquisiten Designs im Laufe der Zeit bei, sodass Ihre Kunden in Artikel investieren können, die Bestand haben und ihre Anziehungskraft behalten."
    },
    ja: {
      "Products Collection": "製品コレクション",
      "Discover our latest product collection, where we share insights, tips, and updates on the latest trends in the industry.": "業界の最新トレンドに関する洞察、ヒント、アップデートを共有する最新の製品コレクションをご覧ください。",
      "Dolls brings imagination to life with stylish, collectible figures that blend playful charm, artistic design, and timeless appeal—crafted to be loved, displayed, and desired.": "ドールは、遊び心のある魅力、芸術的なデザイン、時代を超えた魅力を融合したスタイリッシュなコレクタブルフィギュアで想像力を現実にします—愛され、展示され、求められるように作られています。",
      "Animals Toy sparks wonder with adorable, collectible figures inspired by the wild—where playful design meets heartfelt charm, made to be treasured, shared, and displayed": "アニマルトイは、野生にインスパイアされた愛らしいコレクタブルフィギュアで驚きを呼び起こします—遊び心のあるデザインが心からの魅力と出会う場所で、大切にされ、共有され、展示されるために作られています",
      "Charm & Creativity: Our designs combine playfulness and artistic flair, making each product both delightful and display-worthy": "魅力と創造性：私たちのデザインは遊び心と芸術的な才能を組み合わせ、各製品を楽しく、展示に値するものにします",
      "Versatile Appeal: From home décor to thoughtful gifts, our collection fits into every lifestyle and occasion": "多様な魅力：ホームデコレーションから心のこもったギフトまで、私たちのコレクションはあらゆるライフスタイルと機会にフィットします",
      "Sustainable Practices: Our commitment to sustainability is reflected in eco-conscious materials and mindful production methods": "持続可能な実践：持続可能性への私たちの取り組みは、エコ意識のある材料と心を込めた生産方法に反映されています",
      "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved": "卓越した品質：すべてのブラインドボックスフィギュアがプレミアム材料と精密なディテールで作られ、長持ちし、愛されるように作られていることを保証します",
      "Comfort and Style: Our blind boxes combine the thrill of mystery with bold, artistic character design – perfect for collectors and fans alike": "快適さとスタイル：私たちのブラインドボックスは、謎のスリルと大胆で芸術的なキャラクターデザインを組み合わせています—コレクターとファンの両方に完璧です",
      "Versatile Appeal: From shelf displays to desk décor, our figures bring charm to any space and make unforgettable gifts": "多様な魅力：棚のディスプレイからデスクの装飾まで、私たちのフィギュアはあらゆる空間に魅力をもたらし、忘れられないギフトを作ります",
      "Sustainable Practices: We're committed to eco-conscious packaging and responsible production, adding joy to your collection with less impact on the planet": "持続可能な実践：私たちはエコ意識のある包装と責任ある生産に取り組んでおり、地球への影響を少なくしながらあなたのコレクションに喜びを追加します",
      "Exceptional Craftsmanship: Every Dolls figure is thoughtfully sculpted with premium materials and fine detailing, offering a collectible that's made to be cherished for years": "卓越した職人技：すべてのドールフィギュアは、プレミアム材料と細かいディテールで思慮深く彫刻され、何年も大切にされるコレクタブルを提供します",
      "Art Meets Emotion: Blending elegant aesthetics with expressive character design, Dolls brings heartfelt charm and modern style to every mystery unboxing experience": "アートが感情と出会う：エレガントな美学と表現豊かなキャラクターデザインを融合し、ドールはすべてのミステリーアンボクシング体験に心からの魅力とモダンスタイルをもたらします",
      "Display-Ready Magic: Whether on your shelf, workspace, or as a meaningful gift, Dolls figures add a touch of personality and beauty to any space": "ディスプレイ準備完了の魔法：あなたの棚、ワークスペース、または意味のあるギフトとして、ドールフィギュアはあらゆる空間に個性と美しさのタッチを追加します",
      "Mindful Creation: We embrace sustainable packaging and responsible production to deliver joy that feels good—for you and the planet": "心を込めた創造：私たちは持続可能な包装と責任ある生産を受け入れ、あなたと地球にとって気持ちの良い喜びを提供します",
      "Premium Craftsmanship: Every Animals Toy blind box is made with high-quality materials and intricate details, built to stand the test of time—and affection": "プレミアム職人技：すべてのアニマルトイブラインドボックスは、高品質な材料と複雑なディテールで作られ、時間と愛情の試練に耐えるように作られています",
      "Whimsical Design: Each figure captures the spirit of the wild with playful, imaginative character design that surprises and delights with every unboxing": "奇想天外なデザイン：各フィギュアは、遊び心があり想像力豊かなキャラクターデザインで野生の精神を捉え、すべてのアンボクシングで驚きと喜びをもたらします",
      "Everyday Delight: From cozy shelves to creative workspaces, Animals Toy figures add a dash of personality and joy—perfect for display or gifting": "日常の喜び：居心地の良い棚から創造的なワークスペースまで、アニマルトイフィギュアは個性と喜びのタッチを追加します—ディスプレイやギフトに完璧です",
      "Eco-Friendly Promise: We care about the world our animals come from, which is why we use sustainable packaging and ethical production practices in every stepEco-Friendly Promise: Inspired by the beauty of the animal world, we're committed to sustainable packaging and mindful production—because caring for nature starts with the small things": "エコフレンドリーな約束：私たちは動物たちが来る世界を気にかけているため、すべてのステップで持続可能な包装と倫理的な生産慣行を使用しています エコフレンドリーな約束：動物世界の美しさにインスパイアされ、私たちは持続可能な包装と心を込めた生産に取り組んでいます—自然を大切にすることは小さなことから始まるからです",
      "Learn More": "詳細を見る",
      "Read More": "続きを読む", 
      "Recommended Products": "おすすめ製品",
      "Versatile Doll Compatibility": "多様な人形の互換性",
      "Durable & High-Quality Material": "耐久性のある高品質素材",
      "Perfect Gift Appeal": "完璧なギフトの魅力",
      "Multi-Functional Use Opportunities": "多機能使用機会",
      "Constructed from premium cotton fabric, these doll clothes are not only durable and wear-resistant but also maintain their vibrant colors and exquisite designs over time, allowing your customers to invest in items that will last and retain their appeal.": "プレミアムコットン生地で作られたこれらの人形の服は、耐久性があり摩耗に強いだけでなく、時間が経っても鮮やかな色と精巧なデザインを維持し、お客様が長持ちし魅力を保つアイテムに投資できるようにします。"
    },
    ko: {
      "Products Collection": "제품 컬렉션",
      "Discover our latest product collection, where we share insights, tips, and updates on the latest trends in the industry.": "업계의 최신 트렌드에 대한 통찰력, 팁, 업데이트를 공유하는 최신 제품 컬렉션을 발견하세요.",
      "Dolls brings imagination to life with stylish, collectible figures that blend playful charm, artistic design, and timeless appeal—crafted to be loved, displayed, and desired.": "도울즈는 장난스러운 매력, 예술적 디자인, 시대를 초월한 매력을 결합한 스타일리시한 수집용 피규어로 상상력을 현실로 만듭니다—사랑받고, 전시되고, 원해지도록 제작되었습니다.",
      "Animals Toy sparks wonder with adorable, collectible figures inspired by the wild—where playful design meets heartfelt charm, made to be treasured, shared, and displayed": "애니멀스 토이는 야생에서 영감을 받은 사랑스러운 수집용 피규어로 경이로움을 불러일으킵니다—장난스러운 디자인이 진심 어린 매력과 만나는 곳에서, 소중히 여기고, 공유하고, 전시되도록 만들어졌습니다",
      "Charm & Creativity: Our designs combine playfulness and artistic flair, making each product both delightful and display-worthy": "매력과 창의성: 우리의 디자인은 장난스러움과 예술적 재능을 결합하여 각 제품을 즐겁고 전시할 가치가 있게 만듭니다",
      "Versatile Appeal: From home décor to thoughtful gifts, our collection fits into every lifestyle and occasion": "다양한 매력: 홈 데코에서 사려 깊은 선물까지, 우리의 컬렉션은 모든 라이프스타일과 상황에 맞습니다",
      "Sustainable Practices: Our commitment to sustainability is reflected in eco-conscious materials and mindful production methods": "지속 가능한 실천: 지속 가능성에 대한 우리의 약속은 친환경 소재와 신중한 생산 방법에 반영됩니다",
      "Exceptional Quality: We ensure every blind box figure is crafted with premium materials and precise detailing, built to last and be loved": "탁월한 품질: 모든 블라인드 박스 피규어가 프리미엄 소재와 정밀한 세부사항으로 제작되어 오래 지속되고 사랑받도록 보장합니다",
      "Comfort and Style: Our blind boxes combine the thrill of mystery with bold, artistic character design – perfect for collectors and fans alike": "편안함과 스타일: 우리의 블라인드 박스는 신비로움의 스릴과 대담하고 예술적인 캐릭터 디자인을 결합합니다 – 수집가와 팬 모두에게 완벽합니다",
      "Versatile Appeal: From shelf displays to desk décor, our figures bring charm to any space and make unforgettable gifts": "다양한 매력: 선반 디스플레이에서 책상 장식까지, 우리의 피규어는 모든 공간에 매력을 가져다주고 잊을 수 없는 선물을 만듭니다",
      "Sustainable Practices: We're committed to eco-conscious packaging and responsible production, adding joy to your collection with less impact on the planet": "지속 가능한 실천: 우리는 친환경 포장과 책임감 있는 생산에 전념하여 지구에 미치는 영향을 줄이면서 당신의 컬렉션에 기쁨을 더합니다",
      "Exceptional Craftsmanship: Every Dolls figure is thoughtfully sculpted with premium materials and fine detailing, offering a collectible that's made to be cherished for years": "탁월한 장인정신: 모든 도울즈 피규어는 프리미엄 소재와 세밀한 세부사항으로 신중하게 조각되어 수년간 소중히 여겨질 수집품을 제공합니다",
      "Art Meets Emotion: Blending elegant aesthetics with expressive character design, Dolls brings heartfelt charm and modern style to every mystery unboxing experience": "예술이 감정과 만나다: 우아한 미학과 표현력 있는 캐릭터 디자인을 결합하여, 도울즈는 모든 미스터리 언박싱 경험에 진심 어린 매력과 모던 스타일을 가져다줍니다",
      "Display-Ready Magic: Whether on your shelf, workspace, or as a meaningful gift, Dolls figures add a touch of personality and beauty to any space": "전시 준비 완료 마법: 당신의 선반, 작업 공간, 또는 의미 있는 선물로든, 도울즈 피규어는 모든 공간에 개성과 아름다움의 터치를 더합니다",
      "Mindful Creation: We embrace sustainable packaging and responsible production to deliver joy that feels good—for you and the planet": "신중한 창조: 우리는 지속 가능한 포장과 책임감 있는 생산을 받아들여 당신과 지구에게 좋은 느낌의 기쁨을 전달합니다",
      "Premium Craftsmanship: Every Animals Toy blind box is made with high-quality materials and intricate details, built to stand the test of time—and affection": "프리미엄 장인정신: 모든 애니멀스 토이 블라인드 박스는 고품질 소재와 복잡한 세부사항으로 만들어져 시간과 애정의 시험을 견디도록 제작되었습니다",
      "Whimsical Design: Each figure captures the spirit of the wild with playful, imaginative character design that surprises and delights with every unboxing": "기발한 디자인: 각 피규어는 장난스럽고 상상력이 풍부한 캐릭터 디자인으로 야생의 정신을 포착하여 모든 언박싱에서 놀라움과 기쁨을 선사합니다",
      "Everyday Delight: From cozy shelves to creative workspaces, Animals Toy figures add a dash of personality and joy—perfect for display or gifting": "일상의 기쁨: 아늑한 선반에서 창의적인 작업 공간까지, 애니멀스 토이 피규어는 개성과 기쁨의 터치를 더합니다—전시나 선물에 완벽합니다",
      "Eco-Friendly Promise: We care about the world our animals come from, which is why we use sustainable packaging and ethical production practices in every stepEco-Friendly Promise: Inspired by the beauty of the animal world, we're committed to sustainable packaging and mindful production—because caring for nature starts with the small things": "친환경 약속: 우리는 우리 동물들이 온 세계를 돌봅니다. 그래서 우리는 모든 단계에서 지속 가능한 포장과 윤리적인 생산 관행을 사용합니다 친환경 약속: 동물 세계의 아름다움에 영감을 받아, 우리는 지속 가능한 포장과 신중한 생산에 전념합니다—자연을 돌보는 것은 작은 것들로부터 시작되기 때문입니다",
      "Learn More": "더 알아보기",
      "Read More": "더 읽기",
      "Recommended Products": "추천 제품",
      "Versatile Doll Compatibility": "다양한 인형 호환성",
      "Durable & High-Quality Material": "내구성 있는 고품질 소재",
      "Perfect Gift Appeal": "완벽한 선물 매력",
      "Multi-Functional Use Opportunities": "다기능 사용 기회",
      "Constructed from premium cotton fabric, these doll clothes are not only durable and wear-resistant but also maintain their vibrant colors and exquisite designs over time, allowing your customers to invest in items that will last and retain their appeal.": "프리미엄 면직물로 제작된 이 인형 의류는 내구성이 있고 마모에 강할 뿐만 아니라 시간이 지나도 생생한 색상과 정교한 디자인을 유지하여 고객이 오래 지속되고 매력을 유지하는 아이템에 투자할 수 있게 합니다."
    }
  }
};

// 自动翻译函数
function translateText(text, locale) {
  if (!text || typeof text !== 'string') return text;
  
  // 首先检查产品标题翻译
  const productTitleTranslations = translations.productTitleTranslations[locale];
  if (productTitleTranslations && productTitleTranslations[text]) {
    return productTitleTranslations[text];
  }
  
  // 然后检查通用文本翻译
  const commonTranslations = translations.commonTranslations[locale];
  if (commonTranslations && commonTranslations[text]) {
    return commonTranslations[text];
  }
  
  // 如果没有找到翻译，返回原文
  return text;
}

// 翻译产品分类数据
function translateProductsData(originalData, locale) {
  const categoryTranslations = translations.categoryTranslations[locale] || {};
  
  return {
    header: {
      ...originalData.header,
      title: translateText(originalData.header.title, locale),
      description: translateText(originalData.header.description, locale),
      features: originalData.header.features.map(feature => translateText(feature, locale))
    },
    products: originalData.products.map(product => ({
      ...product,
      title: categoryTranslations[product.title] || product.title,
      description: translateText(product.description, locale),
      features: product.features?.map(feature => translateText(feature, locale)) || []
    }))
  };
}

// 翻译产品详情数据
function translateProductData(originalData, locale) {
  const categoryTranslations = translations.categoryTranslations[locale] || {};
  
  return originalData.map(product => {
    const productSlug = slugify(product.title, { lower: true, strict: true });
    return {
      ...product,
      id: productSlug, // 确保每个产品都有ID
      title: translateText(product.title, locale),
      category: categoryTranslations[product.category] || product.category,
      description: translateText(product.description, locale),
      features: product.features.map(feature => ({
        ...feature,
        title: translateText(feature.title, locale),
        description: translateText(feature.description, locale)
      }))
    };
  });
}

// 导出翻译函数
export function getProductsByLanguage(locale = 'en') {
  if (locale === 'en') {
    return products;
  }
  return translateProductsData(products, locale);
}

export function getAllProductsByLanguage(locale = 'en') {
  if (locale === 'en') {
    return product;
  }
  return translateProductData(product, locale);
}

export function getProductByLanguage(locale = 'en', slug) {
  const products = getAllProductsByLanguage(locale);
  return products.find(product => {
    const productSlug = product.id || slugify(product.title, { lower: true, strict: true });
    return productSlug === slug;
  });
}
