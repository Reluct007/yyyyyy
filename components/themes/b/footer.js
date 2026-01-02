import { footer } from "@/data/home";
import Link from "next/link";

export default function Footer({ data = footer }) {
	return (
		<section className="container pb-8">
			<div className="flex flex-col md:flex-row justify-between md:items-center border-t pt-8 text-sm text-muted-foreground">
				<p>{data.brand}</p>
				<ul className="flex gap-4">
					{data.policies.map((policy, index) => (
						<li key={index} className="hover:text-primary">
							<Link href={policy.href}>{policy.title}</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
