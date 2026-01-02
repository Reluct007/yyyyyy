import { MessageSquare, FileText, Pencil, Clipboard, Flashlight, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { customizableProcess } from "@/data/home";

const icon_list = [<MessageSquare className="h-8 w-8 text-primary" />, <FileText className="h-8 w-8 text-primary" />, <Pencil className="h-8 w-8 text-primary" />, <Clipboard className="h-8 w-8 text-primary" />, <Flashlight className="h-8 w-8 text-primary" />, <ThumbsUp className="h-8 w-8 text-primary" />];

export default function CustomizableProcess({ data = customizableProcess }) {
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
				<p className="max-w-3xl mx-auto text-muted-foreground ">{data.description}</p>
			</div>

			{/* Process steps cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data.items.map((item, index) => (
					<Card key={index} className="border border-border hover:border-primary/30 transition-colors duration-300">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">{icon_list[index]}</div>
								<CardTitle className="text-lg">{item.title}</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">{item.description}</p>
							<div className="flex flex-col gap-2">
								{item.highlights.map((highlight) => (
									<div key={highlight} className="flex items-center gap-2">
										<span className="text-primary text-medium">✓</span>
										<span className="text-sm text-muted-foreground">{highlight}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
