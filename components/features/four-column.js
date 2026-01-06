import Image from "next/image";

export default function FourColumn({ data }) {
  return (
    <section className="px-2 py-8">
      <div className="container mx-auto">
        {/* Subtitle */}
        <div className="mx-auto flex max-w-screen-md flex-col items-center space-y-2">
          <h2 className="text-center text-2xl font-semibold lg:text-4xl">{data.title}</h2>
          <p className="text-center text-lg text-muted-foreground">{data.description}</p>
        </div>
        {/* Display Area */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <div key={index} className="flex flex-col justify-between rounded-lg bg-accent">
              <Image
                src={item.image}
                alt={item.title}
                className="size-full rounded-t-lg"
                width={400}
                height={300}
              />
              <div className="h-full space-y-2 p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-base text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
