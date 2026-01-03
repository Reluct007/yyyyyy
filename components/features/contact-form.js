"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { useState } from 'react';
import Link from 'next/link';
import axios from "axios";

// 表单字段翻译
const formTranslations = {
  name: {
    en: "Name",
    es: "Nombre",
    fr: "Nom",
    de: "Name",
    ja: "名前",
    ko: "이름"
  },
  company: {
    en: "Company",
    es: "Empresa",
    fr: "Entreprise",
    de: "Firma",
    ja: "会社",
    ko: "회사"
  },
  email: {
    en: "Email",
    es: "Correo Electrónico",
    fr: "E-mail",
    de: "E-Mail",
    ja: "メール",
    ko: "이메일"
  },
  phone: {
    en: "Phone",
    es: "Teléfono",
    fr: "Téléphone",
    de: "Telefon",
    ja: "電話",
    ko: "전화"
  },
  quantity: {
    en: "Purchase Quantity",
    es: "Cantidad de Compra",
    fr: "Quantité d'Achat",
    de: "Kaufmenge",
    ja: "購入数量",
    ko: "구매 수량"
  },
  message: {
    en: "Message",
    es: "Mensaje",
    fr: "Message",
    de: "Nachricht",
    ja: "メッセージ",
    ko: "메시지"
  },
  select: {
    en: "Select",
    es: "Seleccionar",
    fr: "Sélectionner",
    de: "Auswählen",
    ja: "選択",
    ko: "선택"
  },
  other: {
    en: "Other",
    es: "Otro",
    fr: "Autre",
    de: "Andere",
    ja: "その他",
    ko: "기타"
  },
  submit: {
    en: "Get Free Quote",
    es: "Obtener Cotización Gratis",
    fr: "Obtenir un Devis Gratuit",
    de: "Kostenloses Angebot Erhalten",
    ja: "無料見積もりを取得",
    ko: "무료 견적 받기"
  },
  viewPrivacy: {
    en: "View our",
    es: "Ver nuestra",
    fr: "Voir notre",
    de: "Unsere ansehen",
    ja: "当社の",
    ko: "당사의"
  },
  privacyPolicy: {
    en: "privacy policy",
    es: "política de privacidad",
    fr: "politique de confidentialité",
    de: "Datenschutzrichtlinie",
    ja: "プライバシーポリシー",
    ko: "개인정보 처리방침"
  },
  namePlaceholder: {
    en: "Joe Average",
    es: "Juan Pérez",
    fr: "Jean Dupont",
    de: "Max Mustermann",
    ja: "山田太郎",
    ko: "홍길동"
  },
  companyPlaceholder: {
    en: "Apple Corp",
    es: "Apple Corp",
    fr: "Apple Corp",
    de: "Apple Corp",
    ja: "Apple Corp",
    ko: "Apple Corp"
  },
  emailPlaceholder: {
    en: "name@company.com",
    es: "nombre@empresa.com",
    fr: "nom@entreprise.com",
    de: "name@firma.com",
    ja: "name@company.com",
    ko: "name@company.com"
  },
  phonePlaceholder: {
    en: "+1 (123) 456-7890",
    es: "+34 123 456 789",
    fr: "+33 1 23 45 67 89",
    de: "+49 123 456789",
    ja: "+81 12-3456-7890",
    ko: "+82 10-1234-5678"
  },
  messagePlaceholder: {
    en: "Please provide any additional details or specific requirements...",
    es: "Por favor proporcione cualquier detalle adicional o requisitos específicos...",
    fr: "Veuillez fournir tous les détails supplémentaires ou exigences spécifiques...",
    de: "Bitte geben Sie zusätzliche Details oder spezifische Anforderungen an...",
    ja: "追加の詳細や特定の要件を提供してください...",
    ko: "추가 세부 정보나 특정 요구 사항을 제공해 주세요..."
  }
};

export default function ContactForm({ locale = 'en' }) {
  const t = (key) => formTranslations[key]?.[locale] || formTranslations[key]?.en || key;
  
  const [data, setData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    message: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // API 服务地址
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yooyooy.com';

    try {
      const response = await axios.post(`${API_URL}/api/contact`, {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        quantity: data.quantity,
        message: data.message
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        setData({
          name: "",
          company: "",
          email: "",
          phone: "",
          quantity: "",
          message: ""
        });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error Submitting Info");
    }
  };

  const privacyUrl = locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`;

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="w-full space-y-4 rounded-lg border p-6 shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2.5 text-sm font-medium">
              <label htmlFor="name">{t('name')}<span className="text-red-500 pl-1">*</span></label>
            </div>
            <Input
              onChange={onChangeHandler}
              id="name"
              name="name"
              value={data.name}
              type="text"
              placeholder={t('namePlaceholder')}
              required
            />
          </div>
          <div>
            <div className="mb-2.5 text-sm font-medium">
              <label htmlFor="company">{t('company')}</label>
            </div>
            <Input
              onChange={onChangeHandler}
              id="company"
              name="company"
              value={data.company}
              type="text"
              placeholder={t('companyPlaceholder')}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2.5 text-sm font-medium">
              <label htmlFor="email">{t('email')}<span className="text-red-500 pl-1">*</span></label>
            </div>
            <Input
              onChange={onChangeHandler}
              id="email"
              name="email"
              value={data.email}
              type="email"
              placeholder={t('emailPlaceholder')}
              required
            />
          </div>
          <div>
            <div className="mb-2.5 text-sm font-medium">
              <label htmlFor="phone">{t('phone')}</label>
            </div>
            <Input
              onChange={onChangeHandler}
              id="phone"
              name="phone"
              value={data.phone}
              type="tel"
              placeholder={t('phonePlaceholder')}
            />
          </div>
        </div>
        <div>
          <div className="mb-2.5 text-sm font-medium">
            <label htmlFor="quantity">{t('quantity')}</label>
          </div>
          <Select onValueChange={(value) => setData({ ...data, quantity: value })} value={data.quantity}>
            <SelectTrigger id="quantity" name="quantity">
              <SelectValue placeholder={t('select')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">300</SelectItem>
              <SelectItem value="500">500</SelectItem>
              <SelectItem value="750">750</SelectItem>
              <SelectItem value="1000">1000</SelectItem>
              <SelectItem value="1500">1500</SelectItem>
              <SelectItem value="2000">2000</SelectItem>
              <SelectItem value="3000">3000</SelectItem>
              <SelectItem value="5000">5000</SelectItem>
              <SelectItem value="other">{t('other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="mb-2.5 text-sm font-medium">
            <label htmlFor="message">{t('message')}<span className="text-red-500 pl-1">*</span></label>
          </div>
          <Textarea
            onChange={onChangeHandler}
            id="message"
            name="message"
            value={data.message}
            placeholder={t('messagePlaceholder')}
            className="min-h-[320px]"
            required
          />
        </div>
        <div className="flex w-full flex-col justify-end space-y-3 pt-2">
          <Button type="submit">{t('submit')}</Button>
          <div className="text-xs text-muted-foreground">
            {t('viewPrivacy')} <Link href={privacyUrl} className="underline">{t('privacyPolicy')}</Link>.
          </div>
        </div>
      </div>
    </form>
  );
}
