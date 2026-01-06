import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ThreeLinkColumn({ data }) {
  return (
    <section className="px-2 py-8">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto flex max-w-screen-md flex-col items-center space-y-2">
          <h2 className="text-center text-2xl font-semibold lg:text-4xl">{data.title}</h2>
          <p className="text-center text-lg text-muted-foreground">{data.description}</p>
        </div>
        {/* Display Area */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <div key={index} className="rounded-lg border">
              <div className="relative">
                <Link href={item.slug} target="_blank">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full rounded-t-lg"
                    width={600}
                    height={400}
                  />
                </Link>
                <Badge variant="outline" className="absolute left-5 top-5 bg-primary-foreground">
                  {item.badge}
                </Badge>
              </div>
              <div className="space-y-2 p-4">
                <Link href={item.slug} target="_blank">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </Link>
                <p className="text-base text-muted-foreground">{item.description}</p>
                <Link
                  href={item.slug}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  target="_blank"
                >
                  Read More <ChevronRight className="w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
