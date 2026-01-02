'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faq as defaultFaq } from "@/components/themes/b/data/home";
import { useLanguage } from '@/lib/language-context';
import Link from "next/link";

export default function FAQ({ data = defaultFaq }) {
  const { translations } = useLanguage();

  // 支持两种格式的 FAQ 数据
  const faqItems = data.items?.flatMap(item => 
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
      <section className="container py-16 md:py-24">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {translations.footer?.support || data.title}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            {translations.contact?.description || data.description}
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
          
          {data.cta_text && (
            <p className="font-medium text-center">
              {data.cta_prefix || "Still have questions?"}{" "}
              <Link href={data.cta_link || "/contact"} className="text-primary hover:underline">
                {data.cta_text}
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
