'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

export default function Error({ error, reset }) {
  const { locale } = useLanguage();
  
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Product page error:', error);
  }, [error]);

  return (
    <section className="py-36 px-2">
      <div className="container mx-auto">
        <div className="text-center space-y-6">
          <div className="text-3xl font-bold md:text-5xl lg:text-7xl">
            <p className="flex flex-wrap items-center justify-center">
              Something went wrong
            </p>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We encountered an error while loading this product. This might be due to:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 text-muted-foreground">
            <li>• The product may no longer be available</li>
            <li>• There might be a temporary server issue</li>
            <li>• The product data may be corrupted</li>
          </ul>
          <div className="flex gap-4 justify-center mt-10">
            <Button size="lg" onClick={() => reset()}>
              Try Again
            </Button>
            <Link href={`/${locale}/collection/`}>
              <Button size="lg" variant="outline">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
