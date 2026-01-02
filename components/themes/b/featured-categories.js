'use client';

import CollectionCard from "@/components/themes/b/collection-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedCategories({ data }) {
  if (!data || !data.items) return null;

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      {/* Section header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {data.title}
        </h2>
        <p className="max-w-3xl mx-auto text-muted-foreground">{data.description}</p>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.items.map((item, index) => (
          <CollectionCard key={index} data={item} />
        ))}
      </div>

      {/* View all button */}
      {data.cta_link && (
        <div className="mt-12 text-center">
          <Link href={data.cta_link}>
            <Button variant="default" size="lg">
              {data.cta_text || "View All"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
