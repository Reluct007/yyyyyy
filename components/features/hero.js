'use client';

import { Badge } from "@/components/ui/badge";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import SubscribeForm from "@/components/features/subscribe-form";
import { useLanguage } from '@/lib/language-context';
import { basic } from "@/data/basic";

export default function Hero({data}) {
  const { translations } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:justify-center space-y-6">
            <Badge variant="outline" className="mb-2 px-4 py-2 text-sm font-medium border-primary/20 text-primary">
              {translations.home?.hero?.badge || data.badge}
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {translations.home?.hero?.title || data.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {translations.home?.hero?.description || data.description}
            </p>
            <div className="w-full lg:w-3/4">
              <SubscribeForm />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <Image 
              src={data.image} 
              alt={`${translations.home?.hero?.title || data.title} - ${basic.info.brand}`} 
              className="relative max-h-[500px] w-full rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500" 
              width={800} 
              height={500} 
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
