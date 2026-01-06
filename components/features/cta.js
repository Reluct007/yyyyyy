"use client";

import SubscribeForm from "@/components/features/subscribe-form";
import { basic } from "@/data/basic";
import { useLanguage } from "@/lib/language-context";

export default function CTA({ data = basic.cta }) {
  const { translations } = useLanguage();

  return (
    <section className="bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-16">
      <div className="container mx-auto">
        <div className="flex w-full flex-col gap-8 overflow-hidden rounded-2xl border border-border/50 bg-card p-8 shadow-lg lg:flex-row lg:items-center lg:gap-12 lg:p-12">
          <div className="flex-1">
            <h3 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {translations.home?.cta?.title || data.title}
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
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
}
