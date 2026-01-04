import { Button } from "@/components/ui/button";
import Link from "next/link";
import { basic } from "@/data/basic";

export const metadata = {
  title: `404 - Page Not Found | ${basic.info.brand}`,
  description: `The page you are looking for could not be found. Browse ${basic.info.brand} products.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound({ params }) {
  const locale = params?.locale;
  const homeHref = locale ? `/${locale}/` : "/";

  return (
    <section className="py-36 px-2">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold md:text-5xl lg:text-7xl">
            <p className="flex flex-wrap items-center justify-center">Page Not Found</p>
          </div>
          <Link href={homeHref}>
            <Button size={'lg'} className="mt-10">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
