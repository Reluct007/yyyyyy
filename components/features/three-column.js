"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export default function ThreeColumn({ data }) {
  const { translations } = useLanguage();

  return (
    <section className="px-2 py-8">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto flex max-w-screen-md flex-col items-center space-y-2">
          <h2 className="text-center text-2xl font-semibold lg:text-4xl">
            {translations.home?.categories?.title || data.title}
          </h2>
          <p className="text-center text-lg text-muted-foreground">
            {translations.home?.categories?.description || data.description}
          </p>
        </div>
        {/* Display Area */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <div key={index} className="rounded-lg border">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full rounded-t-lg"
                  width={600}
                  height={400}
                />
                {item.badge && (
                  <Badge variant="outline" className="absolute left-5 top-5 bg-primary-foreground">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-base text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
