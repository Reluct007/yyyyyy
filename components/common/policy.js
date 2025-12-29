export default function Policy({ data }) {
  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        <article className="prose prose-sm space-y-4">
          <h1 className="text-2xl font-semibold text-center lg:text-4xl">{data.title}</h1>
          {data.sections.map((section, index) => (
            <div key={index} className="space-y-4">
              {section.title && (
                <h2 className="text-xl font-semibold lg:text-2xl">{section.title}</h2>
              )}
              {section.info.map((item, idx) => (
                <p key={idx} className="text-base text-muted-foreground text-justify">{item}</p>
              ))}
            </div>
          ))}
        </article>
      </div>
    </section>
  );
};
