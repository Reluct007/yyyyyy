import CollectionCard from "@/components/widgets/collection-card";
import { featuredCategories } from "@/data/home";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedCategories({ data = featuredCategories }) {
	return (
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

			{/* Categories grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{data.items.map((item) => (
					<CollectionCard key={item.slug} data={item} />
				))}
			</div>

			{/* View all button */}
			<div className="mt-12 text-center">
				<Link href={data.cta_link}>
					<Button variant="default" size="lg">
						{data.cta_text}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</Link>
			</div>
		</section>
	);
}
