'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials({ data }) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      {/* Section header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {data.title}
        </h2>
        <p className="max-w-3xl mx-auto text-muted-foreground">
          {data.description}
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {data.items?.map((item, index) => (
          <Card key={index} className="break-inside-avoid overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <Avatar>
                <AvatarImage alt={item.name} src={item.image} />
                <AvatarFallback>{item.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription className="text-sm">{item.position || item.title}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {item.comment || item.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
