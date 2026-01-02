export default function PolicyTemplate({ data }) {
	return (
		<section className="container max-w-3xl pt-16 md:pt-24 pb-8 md:pb-12 space-y-8">
			<h1 className="text-3xl md:text-4xl font-bold text-center">{data.title}</h1>
			{data.sections.map((section, index) => (
				<div key={index} className="space-y-6">
					{section.title && <h2 className="font-semibold text-lg lg:text-xl">{section.title}</h2>}
					{section.paragraphs.map((paragraph, index) => (
						<p key={index} className="text-base text-muted-foreground  text-justify">
							{paragraph}
						</p>
					))}
				</div>
			))}
		</section>
	);
}
