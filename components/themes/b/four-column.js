import Image from "next/image";

export default function FourColumn({ data }) {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="mx-auto flex flex-col max-w-screen-md items-center space-y-3 mb-12">
          <h2 className="text-center text-3xl font-bold lg:text-4xl tracking-tight">{data.title}</h2>
          <p className="text-center text-muted-foreground text-lg">{data.description}</p>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <div key={index} className="group flex flex-col rounded-2xl bg-card border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" 
                  width={400} 
                  height={300} 
                />
              </div>
              <div className="p-4 space-y-2 flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
