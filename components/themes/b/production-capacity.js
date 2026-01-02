"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { productionCapacity } from "@/data/home";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function ProductionCapacity({ data = productionCapacity }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	useEffect(() => {
		let interval;
		if (isAutoPlaying) {
			interval = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % data.items.length);
			}, 4000);
		}
		return () => clearInterval(interval);
	}, [isAutoPlaying, data.items.length]);

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % data.items.length);
	};

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + data.items.length) % data.items.length);
	};

	const goToSlide = (index) => {
		setCurrentIndex(index);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const handleControlClick = (callback) => {
		setIsAutoPlaying(false);
		callback();
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

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

			{/* Core capabilities */}
			<div className="flex flex-col md:flex-row gap-6">
				<div className="md:w-1/6">
					<div className="flex flex-row md:flex-col gap-2">
						{data.items.map((item, index) => (
							<Card key={index} className={`overflow-hidden cursor-pointer transition-all ${index === currentIndex ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`} onClick={() => goToSlide(index)}>
								<Image src={item.image} alt={`Thumbnail ${index + 1}`} className="w-full h-16 object-cover" width="1200" height="600" />
							</Card>
						))}
					</div>
				</div>

				<div className="md:w-5/6">
					<div className="relative overflow-hidden rounded-lg aspect-[16/9]">
						{data.items.map((item, index) => (
							<div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
								<Image src={item.image} alt={item.title} className="w-full h-full object-cover" width="1200" height="600" />
								<div className="flex flex-col justify-end absolute inset-0 bg-gradient-to-t from-black/30 to-transparent p-8">
									<h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
									<p className="max-w-2xl text-base text-white/90">{item.description}</p>
								</div>
							</div>
						))}
						{/* Navigation buttons */}
						<button onClick={() => handleControlClick(goToPrevious)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors z-10" aria-label="Previous slide">
							<ChevronLeft className="h-6 w-6" />
						</button>
						<button onClick={() => handleControlClick(goToNext)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors z-10" aria-label="Next slide">
							<ChevronRight className="h-6 w-6" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
