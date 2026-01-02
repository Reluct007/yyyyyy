import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/data/home";

export default function Testimonials({ data = testimonials }) {
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

			<div className="grid mx-auto md:grid-cols-2 lg:grid-cols-4 sm:block columns-2 lg:columns-3 pt-4 lg:gap-6 space-y-4 lg:space-y-6">
				{data.items.map((item, index) => (
					<Card key={index} className="max-w-md md:break-inside-avoid overflow-hidden">
						<CardHeader className="flex flex-row items-center gap-8 pb-4">
							<Avatar>
								<AvatarImage alt={item.name} src={item.image} />
								<AvatarFallback>{item.name}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col gap-1">
								<CardTitle className="text-md">{item.name}</CardTitle>
								<CardDescription>{item.position}</CardDescription>
							</div>
						</CardHeader>
						<CardContent className="font-light text-muted-foreground">{item.comment}</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
