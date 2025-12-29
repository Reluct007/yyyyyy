'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from '@/lib/language-context';

export default function FourLinkColumn({ data }) {
  const { translations } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto flex flex-col max-w-3xl items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {translations.product?.title || data.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {translations.product?.description || data.description}
          </p>
        </div>
        {/* Display Area */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <div key={index} className="group flex flex-col justify-between rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <Link href={item.slug} target="_blank" className="relative overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                  width={400} 
                  height={300} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <div className="p-6 space-y-3 h-full">
                <Link href={item.slug} target="_blank">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
                <Link 
                  href={item.slug} 
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors" 
                  target="_blank"
                >
                  {translations.product?.learnMore || "Read More"} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
