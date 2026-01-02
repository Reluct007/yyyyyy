import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Sliders, PenTool, Layers, Cpu, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { customizableOptions } from "@/data/home";
import Image from "next/image";

const icon_list = [<Layers className="h-5 w-5" />, <Sliders className="h-5 w-5" />, <PenTool className="h-5 w-5" />, <Gauge className="h-5 w-5" />, <Cpu className="h-5 w-5" />];

export default function CustomizableOptions({ data = customizableOptions }) {
	return (
		<section className="container pt-24">
			<div className="mb-12 text-center">
				{/* Section Header */}
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

			{/* Tabs */}
			<Tabs defaultValue="materials">
				<TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
					{data.items.map((item, index) => (
						<TabsTrigger key={index} value={item.id} className="flex items-center gap-2">
							{icon_list[index]}
							<span className="hidden md:inline">{item.title}</span>
						</TabsTrigger>
					))}
				</TabsList>

				{data.items.map((item, index) => (
					<TabsContent key={index} value={item.id} className="pt-2">
						<Card>
							<CardContent className="pt-6">
								<div className="flex flex-col md:flex-row gap-8">
									<div className="md:w-1/3">
										<div className="flex items-center gap-2 mb-3">
											{icon_list[index]}
											<h3 className="text-xl font-semibold">{item.title} Options</h3>
										</div>
										<p className="mb-4 text-muted-foreground">{item.description}</p>
										<Image src={item.image} alt={item.title} className="rounded-lg w-full object-cover" width="400" height="400" />
									</div>

									{/* Right side: Options list */}
									<div className="md:w-2/3">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{item.options.map((option) => (
												<div key={option.title} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
													<div className="flex items-start">
														<div className="mr-3 mt-1 bg-primary/10 rounded-full p-1">
															<Check size={16} className="text-primary" />
														</div>
														<div>
															<h4 className="pb-2 font-medium">{option.option}</h4>
															<p className="text-sm text-muted-foreground">{option.description}</p>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>
		</section>
	);
}
