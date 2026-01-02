"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useLanguage } from '@/lib/language-context';

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { locale, translations } = useLanguage();

  const t = {
    placeholder: translations.subscribe?.placeholder || "Enter your email",
    button: translations.subscribe?.button || "Subscribe",
    privacyText: translations.subscribe?.privacyText || "View our",
    privacyLink: translations.subscribe?.privacyLink || "privacy policy"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://labubu-api.vercel.app';
    
    try {
      const response = await axios.post(`${API_URL}/api/subscribe`, { email }, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.success) {
        setEmail("");
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input 
          type="email" 
          placeholder={t.placeholder}
          className="h-12 lg:min-w-80 border-2 rounded-xl px-4 text-base" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          disabled={loading}
          required 
        />
        <Button 
          type="submit" 
          className="h-12 px-8 font-medium rounded-xl"
          disabled={loading}
        >
          {loading ? "..." : t.button}
        </Button>
      </div>
      <p className="mt-3 text-left text-sm text-muted-foreground">
        {t.privacyText}{" "}
        <Link href={locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`} className="underline hover:text-foreground">
          {t.privacyLink}
        </Link>.
      </p>
    </form>
  );
}
