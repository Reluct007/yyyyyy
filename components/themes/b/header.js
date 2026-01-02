import Image from "next/image";

export default function Header({ data }) {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col gap-6">
          <h1 className="text-pretty text-4xl font-bold lg:text-5xl tracking-tight">{data.title}</h1>
          <p className="max-w-3xl text-muted-foreground text-lg leading-relaxed">{data.description}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image src={data.image} alt={data.title} className="w-full h-full object-cover" width={800} height={500} />
          </div>
          <div className="flex flex-col gap-4 rounded-2xl bg-card border p-8">
            <p className="font-semibold text-lg text-primary">Features</p>
            <div className="flex flex-col gap-3">
              {data.features?.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <p className="text-muted-foreground">{feature}</p>
                </div>
              )) || (
                <p className="text-muted-foreground">Premium quality products</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
