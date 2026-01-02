'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials({ data }) {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="mx-auto flex flex-col max-w-screen-md items-center space-y-4 mb-12">
          <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight">{data.title}</h2>
          <p className="text-center text-muted-foreground text-lg leading-relaxed">{data.description}</p>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <Card key={index} className="bg-card border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                <q className="italic">{item.description}</q>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <div className="flex gap-4 leading-5">
                  <Avatar className="size-12 rounded-full ring-2 ring-primary/20">
                    <AvatarImage src={item.image} alt={item.name} />
                  </Avatar>
                  <div className="text-sm space-y-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-muted-foreground">{item.title}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
