// DataTable.jsx
import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './table';
import Pagination from './pagination';
import AvatarBadge from './avatar-badge';

export default function DataTable({
	// data & columns
	columns = [], // [{ key, header, render?: (row)=>node, className?, align? }]
	data = [],
	getRowKey, // (row, index) => key
	// avatar/icon config for convenience on a column (optional)
	leadingIconColumnKey, // e.g. "label"
	iconKey = 'icon', // e.g. property containing icon (node or URL)
	colorKey = 'color', // e.g. property with color for fallback badge
	// empty state
	emptyLabel = 'No records found',
	// pagination (controlled)
	pagination, // { page, pageSize, total, onPageChange, onPageSizeChange, pageSizeOptions? }
}) {
	const hasPagination = !!pagination;

	const renderCell = (col, row) => {
		if (typeof col.render === 'function') return col.render(row);

		if (col.key === leadingIconColumnKey) {
			const name = row[leadingIconColumnKey];
			const icon = row[iconKey];
			const color = row[colorKey];
			return (
				<div className="flex items-center gap-2">
					<AvatarBadge icon={icon} name={name} color={color} />
					<span className="font-medium text-gray-900">
						{String(name ?? '')}
					</span>
				</div>
			);
		}

		return <span className="text-gray-700">{String(row[col.key] ?? '')}</span>;
	};

	return (
		<div className="w-full bg-white ">
			<Table className="w-full">
				<TableHeader>
					<TableRow>
						{columns.map((col) => (
							<TableHead
								key={col.key}
								className={[
									'px-4 py-3 text-sm font-medium text-gray-600',
									col.align === 'right'
										? 'text-right'
										: col.align === 'center'
										? 'text-center'
										: 'text-left',
								]
									.filter(Boolean)
									.join(' ')}
							>
								{col.header}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{data.length === 0 && (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center text-sm text-gray-500"
							>
								{emptyLabel}
							</TableCell>
						</TableRow>
					)}

					{data.map((row, idx) => (
						<TableRow
							key={getRowKey ? getRowKey(row, idx) : row.id ?? idx}
							className="hover:bg-gray-50 transition-colors h-16"
						>
							{columns.map((col) => (
								<TableCell
									key={col.key}
									className={[
										'px-4 py-3 text-sm border-t border-gray-100',
										col.className,
										col.align === 'right'
											? 'text-right'
											: col.align === 'center'
											? 'text-center'
											: 'text-left',
									]
										.filter(Boolean)
										.join(' ')}
								>
									{renderCell(col, row)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>

			{hasPagination && (
				<div className="border-t border-gray-200 px-4 py-3">
					<Pagination
						page={pagination.page}
						pageSize={pagination.pageSize}
						total={pagination.total}
						onPageChange={pagination.onPageChange}
						onPageSizeChange={pagination.onPageSizeChange}
						pageSizeOptions={pagination.pageSizeOptions}
					/>
				</div>
			)}
		</div>
	);
}
