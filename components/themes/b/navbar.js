import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import ContactForm from "@/components/widgets/contact-form";
import { navbar } from "@/data/home";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ data = navbar }) {
	return (
		<section className="shadow-sm py-4">
			<div className="container">
				{/* Desktop Menu */}
				<nav className="hidden lg:flex justify-between">
					<Link href="/" className="flex items-center gap-4">
						<Image src={data.brand.logo} className="w-8" alt={data.brand.name} width={100} height={100} />
						<span className="text-xl font-bold">{data.brand.name}</span>
					</Link>

					<div className="flex items-center gap-4">
						{data.menu.map((item, index) => (
							<Link key={index} href={item.href} className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }))}>
								{item.label}
							</Link>
						))}
					</div>

					<Dialog>
						<DialogTrigger asChild>
							<Button>{data.button.text}</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[625px] p-8">
							<DialogHeader>
								<DialogTitle>{data.button.title}</DialogTitle>
								<DialogDescription>{data.button.description}</DialogDescription>
							</DialogHeader>
							<ContactForm />
						</DialogContent>
					</Dialog>
				</nav>

				{/* Mobile Menu */}
				<div className="block lg:hidden">
					<div className="flex items-center justify-between">
						<Link href="/" className="flex items-center gap-4">
							<Image src={data.brand.logo} className="w-8" alt={data.brand.name} width={100} height={100} />
							<span className="text-xl font-bold">{data.brand.name}</span>
						</Link>

						<Sheet>
							<SheetTrigger asChild>
								<Button variant={"outline"} size={"icon"}>
									<Menu className="size-4" />
								</Button>
							</SheetTrigger>
							<SheetContent className="overflow-y-auto">
								<SheetHeader>
									<SheetTitle>
										<Link href="/" className="flex items-center gap-2">
											<Image src={data.brand.logo} className="w-8" alt={data.brand.name} width={100} height={100} />
											<span className="text-xl font-bold">{data.brand.name}</span>
										</Link>
									</SheetTitle>
								</SheetHeader>

								<div className="my-8 flex flex-col gap-6">
									{data.menu.map((item, index) => (
										<Link key={index} href={item.href} className="text-base">
											{item.label}
										</Link>
									))}
								</div>

								<div className="flex flex-col gap-2">
									<Dialog>
										<DialogTrigger asChild>
											<Button>{data.button.text}</Button>
										</DialogTrigger>
										<DialogContent className="sm:max-w-[625px] p-6 lg:p-8 rounded-lg">
											<DialogHeader>
												<DialogTitle>{data.button.title}</DialogTitle>
												<DialogDescription>{data.button.description}</DialogDescription>
											</DialogHeader>
											<ContactForm />
										</DialogContent>
									</Dialog>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</section>
	);
}
