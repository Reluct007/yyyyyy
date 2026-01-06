import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials({ data }) {
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
            <Card key={index}>
              <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                <q>{item.description}</q>
              </CardContent>
              <CardFooter>
                <div className="flex gap-4 leading-5">
                  <Avatar className="size-12 rounded-full ring-1 ring-input">
                    <AvatarImage src={item.image} alt={item.name} />
                  </Avatar>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{item.name}</p>
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
