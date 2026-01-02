import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import React from "react";

export default function PageHeader({ data }) {
	return (
		<section className="container pt-8 md:pt-16">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">
							<Home className="h-4 w-4" />
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					{data.breadcrumb &&
						data.breadcrumb.map((item, index) => (
							<React.Fragment key={index}>
								<BreadcrumbItem>
									<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</React.Fragment>
						))}
					<BreadcrumbItem>
						<BreadcrumbPage>{data.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className="max-w-3xl mt-4 mb-3 text-3xl md:text-4xl font-bold">
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
			<p className="max-w-5xl text-lg text-muted-foreground text-pretty">{data.description}</p>
		</section>
	);
}
