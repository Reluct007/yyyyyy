'use client';

import SubscribeForm from "@/components/features/subscribe-form";
import { basic } from "@/data/basic";
import { useLanguage } from '@/lib/language-context';

export default function CTA({ data = basic.cta }) {
  const { translations } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container mx-auto">
        <div className="flex w-full flex-col gap-8 p-8 overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg lg:gap-12 lg:p-12 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h3 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {translations.home?.cta?.title || data.title}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {translations.home?.cta?.description || data.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  );
};
