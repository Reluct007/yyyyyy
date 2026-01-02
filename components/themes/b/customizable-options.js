'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Sliders, PenTool, Layers, Cpu, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const icon_list = [
  <Layers key="layers" className="h-5 w-5" />, 
  <Sliders key="sliders" className="h-5 w-5" />, 
  <PenTool key="pentool" className="h-5 w-5" />, 
  <Gauge key="gauge" className="h-5 w-5" />, 
  <Cpu key="cpu" className="h-5 w-5" />
];

export default function CustomizableOptions({ data }) {
  if (!data || !data.items) return null;

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {data.title}
        </h2>
        <p className="max-w-3xl mx-auto text-muted-foreground">{data.description}</p>
      </div>

      <Tabs defaultValue={data.items[0]?.id || "tab-0"}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8 h-auto">
          {data.items.map((item, index) => (
            <TabsTrigger 
              key={index} 
              value={item.id || `tab-${index}`} 
              className="flex items-center gap-2 py-3"
            >
              {icon_list[index % icon_list.length]}
              <span className="hidden md:inline">{item.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {data.items.map((item, index) => (
          <TabsContent key={index} value={item.id || `tab-${index}`} className="pt-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-2 mb-3">
                      {icon_list[index % icon_list.length]}
                      <h3 className="text-xl font-semibold">{item.title} Options</h3>
                    </div>
                    <p className="mb-4 text-muted-foreground">{item.description}</p>
                    {item.image && (
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        className="rounded-lg w-full object-cover" 
                        width={400} 
                        height={400} 
                      />
                    )}
                  </div>

                  <div className="md:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.options?.map((option, optIndex) => (
                        <div 
                          key={optIndex} 
                          className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-start">
                            <div className="mr-3 mt-1 bg-primary/10 rounded-full p-1">
                              <Check size={16} className="text-primary" />
                            </div>
                            <div>
                              <h4 className="pb-2 font-medium">{option.option || option.title}</h4>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
