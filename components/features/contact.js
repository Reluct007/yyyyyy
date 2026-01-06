"use client";

import ContactForm from "@/components/features/contact-form";
import { MapPinHouse, Headset, MailSearch, CalendarClock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Contact({ data }) {
  const { translations } = useLanguage();

  return (
    <section className="px-2 py-8">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto flex max-w-screen-md flex-col items-center space-y-2">
          <h2 className="text-center text-2xl font-semibold lg:text-4xl">
            {translations.contact?.title || data.title}
          </h2>
          <p className="text-center text-lg text-muted-foreground">
            {translations.contact?.description || data.description}
          </p>
        </div>
        {/* Display Area */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border">
            <div className="flex flex-col gap-4 p-6">
              <MapPinHouse className="size-8 shrink-0" />
              <div>
                <h3 className="text-lg font-medium">
                  {translations.contact?.form?.name || "Our Location"}
                </h3>
                <p className="text-base text-muted-foreground">{data.location}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border">
            <div className="flex flex-col gap-4 p-6">
              <Headset className="size-8 shrink-0" />
              <div>
                <h3 className="text-lg font-medium">
                  {translations.contact?.form?.name || "Call Us"}
                </h3>
                <p className="text-base text-muted-foreground">{data.tel}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border">
            <div className="flex flex-col gap-4 p-6">
              <MailSearch className="size-8 shrink-0" />
              <div>
                <h3 className="text-lg font-medium">
                  {translations.contact?.form?.name || "Get in Touch"}
                </h3>
                <p className="text-base text-muted-foreground">{data.email}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border">
            <div className="flex flex-col gap-4 p-6">
              <CalendarClock className="size-8 shrink-0" />
              <div>
                <h3 className="text-lg font-medium">
                  {translations.contact?.form?.name || "Working Hours"}
                </h3>
                <p className="text-base text-muted-foreground">{data.hours}</p>
              </div>
            </div>
          </div>
          <div className="relative col-span-1 overflow-hidden rounded-lg md:col-span-2">
            <iframe
              src={data.map}
              className="absolute left-0 top-0 h-full w-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="col-span-1 md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
