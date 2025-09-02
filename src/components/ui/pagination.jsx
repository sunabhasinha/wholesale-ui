// <CHANGE> new controlled, minimal pagination component (JS, not TS)
import React from 'react';
import { Button } from '../ui/button';

export default function Pagination({
	page = 1,
	pageSize = 10,
	total = 0,
	onPageChange,
	onPageSizeChange,
	pageSizeOptions = [10, 20, 50],
}) {
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const canPrev = page > 1;
	const canNext = page < totalPages;

	return (
		<div className="flex items-center justify-between gap-3 py-3">
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">Rows per page</span>
				<select
					className="h-9 rounded-md border bg-background px-2 text-sm"
					value={pageSize}
					onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
					aria-label="Rows per page"
				>
					{pageSizeOptions.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			</div>

			<div className="flex items-center gap-3">
				<span className="text-sm text-muted-foreground">
					Page {page} of {totalPages}
				</span>
				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange?.(1)}
						disabled={!canPrev}
						aria-label="First page"
					>
						{'<<'}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange?.(page - 1)}
						disabled={!canPrev}
						aria-label="Previous page"
					>
						{'<'}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange?.(page + 1)}
						disabled={!canNext}
						aria-label="Next page"
					>
						{'>'}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange?.(totalPages)}
						disabled={!canNext}
						aria-label="Last page"
					>
						{'>>'}
					</Button>
				</div>
			</div>
		</div>
	);
}
