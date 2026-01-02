export default function Policy({ data }) {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <article className="prose prose-lg mx-auto">
          <h1 className="text-3xl font-bold text-center lg:text-4xl mb-8">{data.title}</h1>
          <div className="space-y-8">
            {data.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                {section.title && (
                  <h2 className="text-xl font-semibold lg:text-2xl text-foreground">{section.title}</h2>
                )}
                {section.info.map((item, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed">{item}</p>
                ))}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
