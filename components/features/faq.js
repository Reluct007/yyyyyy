"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import slugify from "slugify";
import { useLanguage } from "@/lib/language-context";

export default function FAQ({ data }) {
  const { translations } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.items.flatMap((item) =>
      item.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="px-2 py-8">
        <div className="container mx-auto">
          {/* Subtitle */}
          <div className="mx-auto flex max-w-screen-md flex-col items-center space-y-2">
            <h2 className="text-center text-2xl font-semibold lg:text-4xl">
              {translations.faq?.title || data.title}
            </h2>
            <p className="text-center text-lg text-muted-foreground">
              {translations.faq?.description || data.description}
            </p>
          </div>
          {/* Display Area */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item, index) => (
              <div key={index} className="rounded-lg border px-8 py-6 shadow-sm">
                <h3 className="pb-6 text-xl font-normal">{item.title}</h3>
                <div className="h-px border-t border-solid"></div>
                <Accordion type="single" collapsible>
                  {item.faqs.map((faq) => (
                    <AccordionItem
                      key={slugify(faq.question, { lower: true, strict: true })}
                      value={slugify(faq.question, { lower: true, strict: true })}
                    >
                      <AccordionTrigger>
                        <div className="text-left text-lg font-light">{faq.question}</div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-base text-muted-foreground">{faq.answer}</div>
                      </AccordionContent>
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
