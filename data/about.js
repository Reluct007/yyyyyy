import { Code, Infinity, Lock, MessageCircle, Text, Upload } from 'lucide-react';

export const about = {
  header: {
    title: "About Us",
    description: "At Labubu Wholesale, we design collectible art toys that blend playful creativity with exceptional craftsmanship. Our mission is to bring joy, originality, and long-term value to collectors worldwide.",
    image: "/about/1.webp",
    features: [
      "Efficient Production: Our factory is equipped with advanced machinery and smart technology, combining automated cutting and high-tech intelligent systems. With rapid response capabilities and scalable production, we ensure highly efficient and precise processes, guaranteeing timely and reliable delivery.",
      "Premium Quality: Each piece is crafted with precision and made to the highest standards, ensuring lasting durability and detail.",
      "Collector-Focused: We create with collectors in mind, delivering products that enrich collections and elevate the ownership experience.",
      "Innovative Design: Through limited editions and exclusive collaborations, we introduce fresh ideas that set new trends in the art toy industry.",
      "Sustainable Commitment: We embrace eco-conscious materials and responsible production to reduce environmental impact while maintaining quality."
    ]
  },
  intro: {
    title: "Our Story",
    image: "/about/3.webp",
    descriptions: [
      "Founded in 2023, we have adhered to a customer-first philosophy, carefully crafting every product and earning the trust of a growing global client base.",
      "Our dedicated R&D team drives continuous innovation in both technology and design, ensuring stable quality and setting new benchmarks for the industry.",
      "From material selection to final inspection, we enforce strict quality control standards at every stage of production.",
      "Our pursuit of excellence has been recognized with multiple industry awards and certifications, underscoring our commitment to quality and innovation."
    ],
    features: [
      "Customer-centric approach with 24/7 support.",
      "Industry-leading product quality and innovation.",
      "Sustainable and eco-friendly practices.",
      "Comprehensive after-sales service."
    ]
  },
  features: [
    {
      icon: <Lock className="h-5" />,
      title: "100% Secure",
      description: "Our platform employs industry-leading security measures and encryption protocols to ensure your data remains completely protected and private at all times."
    },
    {
      icon: <MessageCircle className="h-5" />,
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions or issues, ensuring you always have the help you need when you need it."
    },
    {
      icon: <Infinity className="h-5" />,
      title: "Unlimited Access",
      description: "Enjoy unrestricted access to all our features and resources without any limitations, allowing you to fully utilize our platform's capabilities at your own pace."
    },
    {
      icon: <Text className="h-5" />,
      title: "Easy to Use",
      description: "We've designed our interface to be intuitive and user-friendly, making it simple for anyone to navigate and utilize our platform's powerful features effectively."
    },
    {
      icon: <Code className="h-5" />,
      title: "Driven by Efficiency",
      description: "With streamlined processes and advanced logistics, we ensure fast turnaround and on-time delivery every time."
    },
    {
      icon: <Upload className="h-5" />,
      title: 'Always Up to Date',
      description: "We continuously update our platform with the latest features and security patches, ensuring you always have access to the most current and reliable technology."
    }
  ],
  gallery: [
    {
      image: "/about/a2.webp",
      alt: "About Us"
    },
    {
      image: "/about/a3.webp",
      alt: "About Us"
    },
    {
      image: "/about/a4.webp",
      alt: "About Us"
    },
    {
      image: "/about/4.webp",
      alt: "About Us"
    },
  ],
  testimonials: [
    {
      name: "Michael Lee",
      image: "/about/r3.webp",
      title: "Founder of PlayCollect Studio",
      description: "Partnering with this factory has been an excellent decision. Their attention to detail and consistent quality have made our product line stand out in the market."
    },
    {
      name: "Laura Chen",
      image: "/about/r2.webp",
      title: "Purchasing Director at Global Merch Group",
      description: "From material selection to final packaging, every step reflects professionalism. Working with them gives us confidence and peace of mind."
    },
    {
      name: "Emily Carter",
      image: "/about/r1.webp",
      title: "Operations Manager at ToyVerse Ltd",
      description: "The team’s ability to deliver large orders on time, without compromising quality, we’ve been able to scale faster and build stronger trust with our customers."
    }
  ]
};
