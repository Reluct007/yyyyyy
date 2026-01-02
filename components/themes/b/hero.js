'use client';

import { Badge } from "@/components/ui/badge";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import SubscribeForm from "@/components/themes/b/subscribe-form";
import { useLanguage } from '@/lib/language-context';

export default function Hero({ data }) {
  const { translations } = useLanguage();
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <div className="container mx-auto">
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              {translations.home?.hero?.badge || data.badge}
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {translations.home?.hero?.title || data.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {translations.home?.hero?.description || data.description}
            </p>
            <div className="w-full lg:w-auto">
              <SubscribeForm />
            </div>
          </div>
          <div className="relative">
            <Image 
              src={data.image} 
              alt={translations.home?.hero?.title || data.title}
              className="w-full rounded-2xl object-cover shadow-xl" 
              width={800} 
              height={500} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
