import { ArrowRight, ShieldCheck, TextSearch, SquareCheckBig, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hero } from "@/data/home";
import Image from "next/image";
import Link from "next/link";

const icon_list = [<ShieldCheck className="h-6 w-6 text-primary" />, <TextSearch className="h-6 w-6 text-primary" />, <SquareCheckBig className="h-6 w-6 text-primary" />, <MonitorSmartphone className="h-6 w-6 text-primary" />];

export default function Hero({ data = hero }) {
	return (
		<div className="relative w-full overflow-hidden">
			{/* Bg Image */}
			<div className="absolute inset-0 z-0">
				<Image src={data.bg_image} alt={data.title} className="w-full h-full object-cover" fill />
				<div className="absolute inset-0 bg-black/40"></div>
			</div>

			{/* CTA Content */}
			<div className="relative z-10 container py-24 md:py-32 lg:py-40">
				<div className="max-w-3xl">
					<h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
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
					</h1>
					<p className="max-w-2xl mb-8 text-lg md:text-lg text-white/90">{data.description}</p>
					<div className="flex flex-col sm:flex-row gap-8">
						{data.button.map((item) => (
							<Link key={item.href} href={item.href}>
								<Button variant={item.variant} size="lg" className="font-medium">
									{item.title}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Footer Features */}
			<div className="relative z-10 bg-white/10 backdrop-blur-sm dark:bg-black/30 py-6 border-t border-white/10">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{data.feature.map((item, index) => (
							<div key={index} className="flex items-center">
								<div className="rounded-full bg-primary/20 p-3 mr-4">{icon_list[index]}</div>
								<div>
									<h3 className="font-semibold text-white">{item.title}</h3>
									<p className="text-sm text-white/70">{item.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
