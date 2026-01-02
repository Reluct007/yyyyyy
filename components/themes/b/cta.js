'use client';

import SubscribeForm from "@/components/themes/b/subscribe-form";
import { Book, ChevronRight, File } from "lucide-react";
import { Card } from "@/components/ui/card";
import { basic } from "@/data/basic";
import { themeCta } from "@/components/themes/b/data/theme";
import { useLanguage } from '@/lib/language-context';
import Link from "next/link";

export default function CTA({ data }) {
  const { translations } = useLanguage();
  
  // 共享数据来自 @/data/basic，主题配置来自 theme.js
  const sharedData = basic.cta;
  const title = translations.home?.cta?.title || data?.title || sharedData.title;
  const description = translations.home?.cta?.description || data?.description || sharedData.description;
  const cards = themeCta.cards;

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 lg:px-20 lg:py-16 rounded-lg border shadow-sm">
        <div>
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">
            {title}
          </h2>
          <p className="mb-6 text-muted-foreground">
            {description}
          </p>
          <div className="w-full lg:w-3/4">
            <SubscribeForm />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {cards.map((card, index) => (
            <Link key={index} href={card.href}>
              <Card className="flex items-center justify-between gap-2 px-6 py-4 hover:bg-accent transition-colors">
                <div className="flex items-start gap-4">
                  {card.icon === "File" ? (
                    <File className="size-5 mt-0.5 text-primary" />
                  ) : (
                    <Book className="size-5 mt-0.5 text-primary" />
                  )}
                  <div>
                    <h3 className="mb-1 font-medium">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
