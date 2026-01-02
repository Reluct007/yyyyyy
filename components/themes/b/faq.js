import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faq } from "@/data/home";
import Link from "next/link";

export default function FAQ({ data = faq }) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: data.items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer
			}
		}))
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<section className="container pt-16 md:pt-24">
				{/* Section header */}
				<div className="mb-12 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						{(() => {
							const parts = data.title.split(data.focus);
							return (
								<>
									{parts[0]}
									<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text font-bold">{data.focus}</span>
									{parts[1]}
								</>
							);
						})()}
					</h2>
					<p className="max-w-3xl mx-auto text-muted-foreground">{data.description}</p>
				</div>

				<div className="flex flex-col gap-8">
					<Accordion type="single" collapsible className="w-full AccordionRoot">
						{data.items.map((item, index) => (
							<AccordionItem key={index} value={`question-${index}`}>
								<AccordionTrigger className="font-medium text-muted-foreground hover:text-muted-foreground/60 hover:no-underline">{item.question}</AccordionTrigger>
								<AccordionContent className="text-base text-accent-foreground/80">{item.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
					<h3 className="font-medium text-accent-foreground/80">
						{data.cta_prefix}{" "}
						<Link href={data.cta_link} className="text-primary transition-all border-primary hover:border-b-2">
							{data.cta_text}
						</Link>
					</h3>
				</div>
			</section>
		</>
	);
}
