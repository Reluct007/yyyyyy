import Image from "next/image";

export default function FourColumn({ data }) {
  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto flex flex-col max-w-screen-md items-center space-y-2">
          <h2 className="text-center text-2xl font-semibold lg:text-4xl">{data.title}</h2>
          <p className="text-center text-muted-foreground text-lg">{data.description}</p>
        </div>
        {/* Display Area */}
        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <div key={index} className="flex flex-col justify-between rounded-lg bg-accent">
              <Image src={item.image} alt={item.title} className="size-full rounded-t-lg" width={400} height={300} />
              <div className="p-4 space-y-2 h-full">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-base text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
