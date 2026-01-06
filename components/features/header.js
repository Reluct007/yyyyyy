import Image from "next/image";

export default function Header({ data }) {
  return (
    <section className="px-2 py-8">
      <div className="container mx-auto">
        {/* Title & Desc */}
        <div className="flex flex-col gap-4">
          <h1 className="text-pretty text-4xl font-bold lg:text-6xl">{data.title}</h1>
          <p className="max-w-4xl text-lg text-muted-foreground">{data.description}</p>
        </div>
        {/* Images & Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Image
            src={data.image}
            alt={data.title}
            className="max-h-[500px] w-full rounded-lg object-cover"
            width={800}
            height={500}
          />
          <div className="flex flex-col gap-4 rounded-lg bg-muted p-10">
            <p className="text-lg font-semibold">Features:</p>
            <div className="flex flex-col gap-2">
              {data.features?.map((feature, index) => (
                <p key={index} className="text-base text-muted-foreground">
                  {feature}
                </p>
              )) || <p className="text-base text-muted-foreground">Premium quality collectibles</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
