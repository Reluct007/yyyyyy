'use client';

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useLanguage } from '@/lib/language-context';

export default function TwoColumn({ data }) {
  const { translations } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="mx-auto flex flex-col max-w-screen-md items-center space-y-3 mb-12">
          <h2 className="text-center text-3xl font-bold lg:text-4xl tracking-tight">
            {translations.about?.title || data.title}
          </h2>
          <p className="text-center text-muted-foreground text-lg">
            {translations.about?.description || data.description}
          </p>
        </div>
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <h3 className="text-2xl font-semibold">{data.subtitle || "Our Products"}</h3>
            <div className="space-y-4">
              {data.descriptions?.map((description, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">{description}</p>
              ))}
            </div>
            <ul className="space-y-3">
              {data.features?.map((feature, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src={data.image} className="w-full h-full object-cover" alt={data.title} width={800} height={600} />
          </div>
        </div>
      </div>
    </section>
  );
}
