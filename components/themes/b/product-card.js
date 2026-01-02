import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ data }) {
	return (
		<Card className="group overflow-hidden border border-border">
			<Link href={`/product/${data.slug}`}>
				<div className="relative h-48 overflow-hidden">
					<Image src={data.main_image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width="400" height="300" />
				</div>
				<CardContent className="p-6">
					<h3 className="text-xl font-semibold mb-2">{data.title}</h3>
					<p className="text-muted-foreground text-sm mb-4">{data.description}</p>
					<div className="flex items-center text-sm text-primary font-medium">
						Learn More
						<ArrowRight className="ml-1 h-4 w-4" />
					</div>
				</CardContent>
			</Link>
		</Card>
	);
}
