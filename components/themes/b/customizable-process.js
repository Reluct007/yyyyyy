'use client';

import { MessageSquare, FileText, Pencil, Clipboard, Flashlight, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const icon_list = [
  <MessageSquare key="msg" className="h-6 w-6 text-primary" />, 
  <FileText key="file" className="h-6 w-6 text-primary" />, 
  <Pencil key="pencil" className="h-6 w-6 text-primary" />, 
  <Clipboard key="clip" className="h-6 w-6 text-primary" />, 
  <Flashlight key="flash" className="h-6 w-6 text-primary" />, 
  <ThumbsUp key="thumb" className="h-6 w-6 text-primary" />
];

export default function CustomizableProcess({ data }) {
  if (!data || !data.items) return null;

  return (
    <section className="container py-16 md:py-24">
      {/* Section header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {data.title}
        </h2>
        <p className="max-w-3xl mx-auto text-muted-foreground">{data.description}</p>
      </div>

      {/* Process steps cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((item, index) => (
          <Card key={index} className="border border-border hover:border-primary/30 transition-colors duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  {icon_list[index % icon_list.length]}
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              {item.highlights && (
                <div className="flex flex-col gap-2">
                  {item.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
