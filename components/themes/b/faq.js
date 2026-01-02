'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import slugify from "slugify";
import { useLanguage } from '@/lib/language-context';

export default function FAQ({ data }) {
  const { translations } = useLanguage();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.items.flatMap((item) =>
      item.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="mx-auto flex flex-col max-w-screen-md items-center space-y-4 mb-12">
            <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight">
              {translations.footer?.support || data.title}
            </h2>
            <p className="text-center text-muted-foreground text-lg leading-relaxed">
              {translations.contact?.description || data.description}
            </p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item, index) => (
              <div key={index} className="bg-card border rounded-2xl px-8 py-6 shadow-sm">
                <h3 className="pb-6 text-xl font-semibold">{item.title}</h3>
                <div className="h-px border-t border-solid"></div>
                <Accordion type="single" collapsible>
                  {item.faqs.map((faq) => (
                    <AccordionItem key={slugify(faq.question, { lower: true, strict: true })} value={slugify(faq.question, { lower: true, strict: true })}>
                      <AccordionTrigger><div className="text-base text-left font-medium">{faq.question}</div></AccordionTrigger>
                      <AccordionContent><div className="text-base text-muted-foreground">{faq.answer}</div></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
