import SubscribeForm from "@/components/widgets/subscribe-form";
import { Book, ChevronRight, File } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cta } from "@/data/home";
import Link from "next/link";

export default function CTA({ data = cta }) {
	return (
		<section className="container py-16 md:py-24">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 lg:px-20 lg:py-16 rounded-lg border shadow-sm">
				<div>
					<h2 className="mb-2 text-3xl md:text-4xl font-bold">
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
					<p className="mb-4 text-muted-foreground">{data.description}</p>
					<div className="w-full lg:w-3/4">
						<SubscribeForm />
					</div>
				</div>

				<div className="flex flex-col gap-4">
					{data.cards.map((card, index) => (
						<Link key={index} href={card.href}>
							<Card className="flex items-center justify-between gap-2 px-6 py-4 hover:bg-accent">
								<div className="flex items-start gap-2">
									{card.icon === "File" ? <File className="size-5" /> : <Book className="size-5" />}
									<div>
										<h3 className="mb-2 font-medium leading-4">{card.title}</h3>
										<p className="text-sm text-muted-foreground">{card.description}</p>
									</div>
								</div>
								<ChevronRight className="size-6" />
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
