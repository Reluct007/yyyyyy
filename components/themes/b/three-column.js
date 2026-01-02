'use client';

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

export default function ThreeColumn({ data }) {
  const { translations } = useLanguage();
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="mx-auto flex flex-col max-w-screen-md items-center space-y-3 mb-12">
          <h2 className="text-center text-3xl font-bold lg:text-4xl tracking-tight">
            {translations.product?.features || data.title}
          </h2>
          <p className="text-center text-muted-foreground text-lg">
            {translations.product?.description || data.description}
          </p>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <div key={index} className="group rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                  width={600} 
                  height={400} 
                />
                {item.badge && (
                  <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
