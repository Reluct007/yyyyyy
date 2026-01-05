import { redirect } from 'next/navigation';
import { getSupportedLocales } from "@/lib/i18n";

export async function generateStaticParams() {
  return getSupportedLocales().map(locale => ({ locale }));
}

export default function ProductsRedirect({ params }) {
  const { locale } = params;
  const urlPrefix = locale === 'en' ? '' : `/${locale}`;
  redirect(`${urlPrefix}/collection/`);
}
