"use client";

import { subscription } from "@/lib/action/subscription.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import Link from "next/link";

export default function SubscribeForm() {
	const [email, setEmail] = useState("");
	const [isPending, startTransition] = useTransition();

	const isValidEmail = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleSubscribe = (e) => {
		e.preventDefault();
		if (!email || !isValidEmail(email)) {
			toast.error("Please enter a valid email address");
			return;
		}

		startTransition(async () => {
			try {
				const formData = new FormData();
				formData.append("email", email);
				formData.append("url", window.location.href);
				const result = await subscription(formData);
				if (result.success) {
					toast.success(result.message);
					setEmail("");
				} else {
					toast.error(result.message);
				}
			} catch (error) {
				toast.error("Subscribe failed, please try again later.");
			}
		});
	};

	return (
		<form onSubmit={handleSubscribe}>
			<div className="flex w-full max-w-md items-center space-x-2">
				<Input type="email" placeholder="Enter your email" className="h-10 lg:min-w-72" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isPending} required />
				<Button type="submit" className="h-10" disabled={isPending}>
					{isPending ? "Subscrib..." : "Subscribe"}
				</Button>
			</div>
			<p className="mt-2 text-left text-xs text-muted-foreground">
				View our{" "}
				<Link href="/privacy-policy" className="underline hover:text-foreground">
					privacy policy
				</Link>
				.
			</p>
		</form>
	);
}
