'use client';
import React from 'react';
import { useFetch } from '../hooks/useApi';
import { ecommerceAPI } from '@/services/api';
import DataTable from '../components/ui/dataTable';
import AvatarBadge from './ui/avatar-badge';

const ProductsPage = () => {
	const {
		data: products,
		loading: productsLoading,
		error: productsError,
	} = useFetch(() => ecommerceAPI.getProducts());

	const [page, setPage] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(10);

	const total = products?.length ?? 0;
	const start = (page - 1) * pageSize;
	const currentRows = products?.slice(start, start + pageSize) ?? [];

	if (productsLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				Loading products...
			</div>
		);
	}

	if (productsError) {
		return (
			<div className="flex items-center justify-center h-64 text-red-500">
				Error: {productsError}
			</div>
		);
	}

	const columns = [
		{
			key: 'name',
			header: 'Product',
			align: 'left',
			render: (row) => {
				const images = row.images || [];
				let thumbUrl = null;
				if (images.length > 0 && images[0].sizes) {
					const thumb = images[0].sizes.find((s) => s.size === 'THUMBNAIL');
					if (thumb) thumbUrl = thumb.url;
				}
				return (
					<div className="flex items-center gap-3">
						{thumbUrl ? (
							<img
								src={thumbUrl}
								alt={row.name}
								className="w-10 h-10 object-cover rounded-lg border"
							/>
						) : (
							<AvatarBadge name={row.name} />
						)}
						<span className="font-medium text-gray-900">{row.name}</span>
					</div>
				);
			},
		},
		{ key: 'amount', header: 'Price ($)', align: 'left' },
		{ key: 'quantity', header: 'Quantity', align: 'left' },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Products</h1>
					<p className="text-muted-foreground">Manage your product inventory</p>
				</div>
			</div>

			<DataTable
				columns={columns}
				data={currentRows}
				getRowKey={(row) => row.id}
				leadingIconColumnKey="name"
				iconKey="icon"
				colorKey="color"
				emptyLabel="No products found"
				pagination={{
					page,
					pageSize,
					total,
					onPageChange: setPage,
					onPageSizeChange: (size) => {
						setPageSize(size);
						setPage(1);
					},
				}}
			/>
		</div>
	);
};

export default ProductsPage;
