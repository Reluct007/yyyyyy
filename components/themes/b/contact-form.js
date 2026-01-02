"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useTransition, useRef } from "react";
import { contact } from "@/lib/action/contact.action";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";

export default function ContactForm() {
	const [data, setData] = useState({
		name: "",
		company: "",
		email: "",
		phone: "",
		quantity: "",
		message: "",
		files: []
	});

	const [isPending, startTransition] = useTransition();
	const fileInputRef = useRef(null);
	const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const onFileChange = (e) => {
		const files = Array.from(e.target.files);
		setData((prev) => ({
			...prev,
			files: files
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!data.name) {
			toast.error("Please enter your name.");
			return;
		}
		if (!data.email || !isValidEmail(data.email)) {
			toast.error("Please enter a valid email address.");
			return;
		}
		if (!data.message) {
			toast.error("Please enter a message.");
			return;
		}

		startTransition(async () => {
			try {
				const formData = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (key === "files") {
						value.forEach((file, index) => {
							formData.append(`file_${index}`, file);
						});
					} else {
						formData.append(key, value);
					}
				});
				formData.append("url", window.location.href);

				const result = await contact(formData);

				if (!result) {
					throw new Error("Something went wrong, please try again later.");
				}

				if (result.success) {
					setData({
						name: "",
						company: "",
						email: "",
						phone: "",
						quantity: "",
						message: "",
						files: []
					});
					if (fileInputRef.current) {
						fileInputRef.current.value = "";
					}
					toast.success(result.message);
				} else {
					toast.error(result.message);
				}
			} catch (error) {
				toast.error("Something went wrong, please try again later.");
			}
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="w-full rounded-lg border shadow-md space-y-6 p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label htmlFor="name" className="block mb-2.5 text-sm font-medium">
							Name<span className="pl-1 text-red-500">*</span>
						</label>
						<Input id="name" name="name" type="text" value={data.name} onChange={onChangeHandler} disabled={isPending} required />
					</div>
					<div>
						<label htmlFor="company" className="block mb-2.5 text-sm font-medium">
							Company
						</label>
						<Input id="company" name="company" type="text" value={data.company} onChange={onChangeHandler} disabled={isPending} />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label htmlFor="email" className="block mb-2.5 text-sm font-medium">
							Email<span className="pl-1 text-red-500">*</span>
						</label>
						<Input id="email" name="email" type="email" value={data.email} onChange={onChangeHandler} disabled={isPending} required />
					</div>
					<div>
						<label htmlFor="phone" className="block mb-2.5 text-sm font-medium">
							Phone
						</label>
						<Input id="phone" name="phone" type="tel" value={data.phone} onChange={onChangeHandler} disabled={isPending} />
					</div>
				</div>
				<div>
					<label htmlFor="quantity" className="block mb-2.5 text-sm font-medium">
						Quote Quantity
					</label>
					<Select onValueChange={(value) => setData((prev) => ({ ...prev, quantity: value }))} value={data.quantity} disabled={isPending}>
						<SelectTrigger id="quantity" name="quantity">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="100">100</SelectItem>
							<SelectItem value="500">500</SelectItem>
							<SelectItem value="1000">1000</SelectItem>
							<SelectItem value="3000">3000</SelectItem>
							<SelectItem value="5000">5000</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<label htmlFor="message" className="block mb-2.5 text-sm font-medium">
						Message<span className="pl-1 text-red-500">*</span>
					</label>
					<Textarea id="message" name="message" value={data.message} onChange={onChangeHandler} className="min-h-[180px]" disabled={isPending} required />
				</div>
				<div>
					<label htmlFor="files" className="block mb-2.5 text-sm font-medium">
						File Upload
					</label>
					<Input id="files" name="files" type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx" onChange={onFileChange} disabled={isPending} ref={fileInputRef} />
					{data.files.length > 0 && (
						<ul className="mt-2 text-xs">
							{data.files.map((file, index) => (
								<li key={index}>{file.name}</li>
							))}
						</ul>
					)}
				</div>
				<div className="flex flex-col space-y-2 pt-2">
					<Button type="submit" disabled={isPending}>
						{isPending ? "Submitting..." : "Get Free Quote"}
					</Button>
					<div className="text-xs text-muted-foreground">
						View our{" "}
						<Link href="/privacy-policy" className="underline hover:text-foreground">
							privacy policy
						</Link>
						.
					</div>
				</div>
			</div>
		</form>
	);
}
