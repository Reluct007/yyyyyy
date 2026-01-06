"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function FourLinkColumn({ data }) {
  const { translations } = useLanguage();

  return (
    <section className="bg-gradient-to-b from-background to-muted/10 px-4 py-16">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {translations.product?.title || data.title}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {translations.product?.description || data.description}
          </p>
        </div>
        {/* Display Area */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Link href={item.slug} target="_blank" className="relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
              <div className="h-full space-y-3 p-6">
                <Link href={item.slug} target="_blank">
                  <h3 className="line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                </Link>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <Link
                  href={item.slug}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  target="_blank"
                >
                  {translations.product?.learnMore || "Read More"}{" "}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
