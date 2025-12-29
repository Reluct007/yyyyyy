'use client';

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useLanguage } from '@/lib/language-context';

export default function TwoColumn({ data }) {
  const { translations } = useLanguage();
  
  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto flex flex-col max-w-screen-md items-center space-y-2">
          <h2 className="text-center text-2xl font-semibold lg:text-4xl">
            {translations.about?.title || data.title}
          </h2>
          <p className="text-center text-muted-foreground text-lg">
            {translations.about?.description || data.description}
          </p>
        </div>
        {/* Display Area */}
        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-xl font-medium lg:text-2xl">{data.subtitle || "Our Products"}</h3>
            {data.descriptions?.map((description, index) => (
              <p key={index} className="text-base text-muted-foreground">{description}</p>
            ))}
            <ul className="space-y-2">
              {data.features?.map((feature, index) => (
                <li key={index} className="flex gap-x-2"><CheckCircle className="mt-1 size-4 shrink-0" /><p className="text-base text-muted-foreground">{feature}</p></li>
              ))}
            </ul>
          </div>
          <Image src={data.image} className="rounded-lg" alt={data.title} width={800} height={600} />
        </div>
      </div>
    </section>
  );
};
