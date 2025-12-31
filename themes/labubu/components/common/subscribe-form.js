"use client";

import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { useState } from 'react';
import Link from 'next/link';
import axios from "axios";
import { useLanguage } from '@/lib/language-context';

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const { locale, translations } = useLanguage();
  
  // Translations for subscribe form
  const t = {
    placeholder: translations.subscribe?.placeholder || "Enter your email",
    button: translations.subscribe?.button || "Subscribe",
    privacyText: translations.subscribe?.privacyText || "View our",
    privacyLink: translations.subscribe?.privacyLink || "privacy policy"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    try {
      const response = await axios.post("/api/subscribe", formData);
      if (response.data.success) {
        setEmail("");
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input 
          type="email" 
          placeholder={t.placeholder} 
          className="h-12 lg:min-w-80 border-2 border-border/50 focus:border-primary/50 rounded-xl px-4 text-base" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <Button 
          type="submit" 
          className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {t.button}
        </Button>
      </div>
      <p className="mt-3 text-left text-sm text-muted-foreground">
        {t.privacyText} <Link href={locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`} className="underline hover:text-primary transition-colors">{t.privacyLink}</Link>.
      </p>
    </form>
  );
};
