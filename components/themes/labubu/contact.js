'use client';

import ContactForm from "@/components/themes/labubu/contact-form";
import { MapPinHouse, Headset, MailSearch, CalendarClock } from "lucide-react";
import { useLanguage } from '@/lib/language-context';

export default function Contact({ data }) {
  const { translations } = useLanguage();
  
  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto flex flex-col max-w-screen-md items-center space-y-2">
          <h2 className="text-center text-2xl font-semibold lg:text-4xl">
            {translations.contact?.title || data.title}
          </h2>
          <p className="text-center text-muted-foreground text-lg">
            {translations.contact?.description || data.description}
          </p>
        </div>
        {/* Display Area */}
        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border">
            <div className="flex flex-col gap-4 p-6">
              <MapPinHouse className="size-8 shrink-0" />
              <div>
                <h3 className="text-lg font-medium">{translations.contact?.form?.name || "Our Location"}</h3>
                <p className="text-base text-muted-foreground">{data.location}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border">
            <div className="flex flex-col gap-4 p-6">
              <Headset className="size-8 shrink-0" />
              <div>
                <h3 className="text-lg font-medium">{translations.contact?.form?.name || "Call Us"}</h3>
                <p className="text-base text-muted-foreground">{data.tel}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border">
            <div className="flex flex-col gap-4 p-6">
              <MailSearch className="size-8 shrink-0" />
              <div>
                <h3 className="text-lg font-medium">{translations.contact?.form?.name || "Get in Touch"}</h3>
                <p className="text-base text-muted-foreground">{data.email}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border">
            <div className="flex flex-col gap-4 p-6">
              <CalendarClock className="size-8 shrink-0" />
              <div>
                <h3 className="text-lg font-medium">{translations.contact?.form?.name || "Working Hours"}</h3>
                <p className="text-base text-muted-foreground">{data.hours}</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg col-span-1 md:col-span-2">
            <iframe src={data.map} className="absolute top-0 left-0 w-full h-full border-0" allowFullScreen="" loading="lazy"></iframe>
          </div>
          <div className="col-span-1 md:col-span-2"><ContactForm /></div>
        </div>
      </div>
    </section>
  );
};
