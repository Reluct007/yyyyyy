"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import SubscribeForm from "@/components/features/subscribe-form";
import { useLanguage } from "@/lib/language-context";
import { basic } from "@/data/basic";

export default function Hero({ data }) {
  const { translations } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-background to-muted/20 px-4 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:justify-center lg:text-left">
            <Badge
              variant="outline"
              className="mb-2 border-primary/20 px-4 py-2 text-sm font-medium text-primary"
            >
              {translations.home?.hero?.badge || data.badge}
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              {translations.home?.hero?.title || data.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {translations.home?.hero?.description || data.description}
            </p>
            <div className="w-full lg:w-3/4">
              <SubscribeForm />
            </div>
          </div>
          <div className="group relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-75 blur-xl transition duration-1000 group-hover:opacity-100"></div>
            <Image
              src={data.image}
              alt={`${translations.home?.hero?.title || data.title} - ${basic.info.brand}`}
              className="relative max-h-[500px] w-full rounded-2xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
              width={800}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
