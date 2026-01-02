'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { home } from "@/data/home";
import { useLanguage } from '@/lib/language-context';
import Link from "next/link";

export default function FAQ({ data }) {
  const { translations } = useLanguage();

  // 共享数据来自 @/data/home
  const sharedData = home.faq;
  const faqData = data || sharedData;

  // 支持两种格式的 FAQ 数据
  const faqItems = faqData.items?.flatMap(item => 
    item.faqs ? item.faqs : [item]
  ) || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container mx-auto px-4 py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {translations.footer?.support || faqData.title}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            {translations.contact?.description || faqData.description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`question-${index}`}>
                <AccordionTrigger className="font-medium text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <p className="font-medium text-center">
            Still have questions?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
