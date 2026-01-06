"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useLanguage } from "@/lib/language-context";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const { locale, translations } = useLanguage();

  // Translations for subscribe form
  const t = {
    placeholder: translations.subscribe?.placeholder || "Enter your email",
    button: translations.subscribe?.button || "Subscribe",
    privacyText: translations.subscribe?.privacyText || "View our",
    privacyLink: translations.subscribe?.privacyLink || "privacy policy",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API 服务地址
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.yooyooy.com";

    try {
      const response = await axios.post(
        `${API_URL}/api/subscribe`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
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
          className="h-12 rounded-xl border-2 border-border/50 px-4 text-base focus:border-primary/50 lg:min-w-80"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="h-12 rounded-xl bg-primary px-8 font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl"
        >
          {t.button}
        </Button>
      </div>
      <p className="mt-3 text-left text-sm text-muted-foreground">
        {t.privacyText}{" "}
        <Link
          href={`/${locale}/privacy-policy/`}
          className="underline transition-colors hover:text-primary"
        >
          {t.privacyLink}
        </Link>
        .
      </p>
    </form>
  );
}
