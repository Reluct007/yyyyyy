"use client";

import { ArrowUpToLine } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 400) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		});
	}, []);

	const backToTop = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
	};

	return (
		<>
			{isVisible && (
				<Button onClick={backToTop} className="fixed bottom-5 right-5 opacity-100 shadow-xl hover:bg-primary/90" size="icon">
					<ArrowUpToLine className="h-5 w-5" />
				</Button>
			)}
		</>
	);
}
