import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function PaginationBlock({ totalPages, currentPage, prevPage, nextPage, pageNumbers }) {
	return (
		<Pagination className="container mt-8">
			<PaginationContent className="w-full">
				<PaginationItem>
					<PaginationPrevious href={currentPage !== 1 ? `?page=${prevPage}` : undefined} className="hover:bg-primary hover:text-primary-foreground" aria-disabled={currentPage === 1} />
				</PaginationItem>
				{pageNumbers.map((pageNumber) => (
					<PaginationItem key={pageNumber}>
						<PaginationLink href={`?page=${pageNumber}`} className="hover:bg-primary hover:text-primary-foreground" isActive={currentPage === pageNumber}>
							{pageNumber}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext href={currentPage !== totalPages ? `?page=${nextPage}` : undefined} className="hover:bg-primary hover:text-primary-foreground" aria-disabled={currentPage === totalPages} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
