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
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://labubu-api.reluct007.workers.dev';
    
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
    <form onSubmit={handleSubmit}>
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input 
          type="email" 
          placeholder={t.placeholder}
          className="h-10 lg:min-w-72" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          disabled={loading}
          required 
        />
        <Button type="submit" className="h-10" disabled={loading}>
          {loading ? "..." : t.button}
        </Button>
      </div>
      <p className="mt-2 text-left text-xs text-muted-foreground">
        {t.privacyText}{" "}
        <Link href={locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`} className="underline hover:text-foreground">
          {t.privacyLink}
        </Link>.
      </p>
    </form>
  );
}
