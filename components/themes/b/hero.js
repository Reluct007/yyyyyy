'use client';

import { ArrowRight, ShieldCheck, TextSearch, SquareCheckBig, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/lib/language-context';
import Image from "next/image";
import Link from "next/link";

const icon_list = [
  <ShieldCheck key="shield" className="h-6 w-6 text-primary" />, 
  <TextSearch key="search" className="h-6 w-6 text-primary" />, 
  <SquareCheckBig key="check" className="h-6 w-6 text-primary" />, 
  <MonitorSmartphone key="monitor" className="h-6 w-6 text-primary" />
];

export default function Hero({ data }) {
  const { translations } = useLanguage();
  
  // 默认按钮配置
  const defaultButtons = [
    { title: "Explore Products", variant: "default", href: "/products" },
    { title: "Contact Us", variant: "outline", href: "/contact" }
  ];
  
  // 默认特性配置
  const defaultFeatures = [
    { title: "Premium Quality", description: "ISO certified manufacturing" },
    { title: "Custom Design", description: "Tailored to your specifications" },
    { title: "Fast Delivery", description: "Efficient production timelines" },
    { title: "24/7 Support", description: "Always here to help" }
  ];

  const buttons = data.button || defaultButtons;
  const features = data.feature || defaultFeatures;
  const bgImage = data.bg_image || data.image || "/themes/b/home/hero-bg.webp";

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={bgImage} 
          alt={data.title} 
          className="w-full h-full object-cover" 
          fill 
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* CTA Content */}
      <div className="relative z-10 container py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {translations.home?.hero?.title || data.title}
          </h1>
          <p className="max-w-2xl mb-8 text-lg md:text-xl text-white/90">
            {translations.home?.hero?.description || data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {buttons.map((item, index) => (
              <Link key={index} href={item.href}>
                <Button 
                  variant={item.variant} 
                  size="lg" 
                  className={`font-medium ${item.variant === 'outline' ? 'border-white text-white hover:bg-white/10' : ''}`}
                >
                  {item.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Features */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm dark:bg-black/30 py-6 border-t border-white/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="rounded-full bg-primary/20 p-3 mr-4">
                  {icon_list[index % icon_list.length]}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
