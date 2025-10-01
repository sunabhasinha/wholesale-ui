'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFetch } from '@/hooks/useApi';
import { ecommerceAPI } from '@/services/api';

export default function UserProductsPage() {
	const {
		data: userProducts,
		loading: userProductsLoading,
		error: userProductsError,
	} = useFetch(() => ecommerceAPI.getProducts());

	const navigate = useNavigate();

	// Calculate pagination
	const [page, setPage] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(10);

	const total = userProducts?.length ?? 0;
	const start = (page - 1) * pageSize;
	const currentRows = userProducts?.slice(start, start + pageSize) ?? [];
	const handleAddToCart = (product) => {
		console.log('Adding to cart:', product.name);
		alert(`coming soon`);
		// Add your cart logic here
	};

	const handleBuyNow = (product) => {
		console.log('Buy now:', product.name);
		alert(`coming soon`);
		// Add your buy now logic here
	};

	if (userProductsLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				Loading products...
			</div>
		);
	}

	if (userProductsError) {
		return (
			<div className="flex items-center justify-center h-64 text-red-500">
				Error: {userProductsError}
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
				<p className="text-muted-foreground">
					Discover our amazing collection of products
				</p>
			</div>

			{/* Products Grid */}
			<div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
				{currentRows.map((product) => (
					<Card key={product.id} className="overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
						<div className="flex flex-col">
							{/* Image at Top */}
							<div className="aspect-square">
								<img
									src={
										product.images?.[0]?.sizes?.find((img) => img.size === "MEDIUM")?.url ||
										'/placeholder.svg?height=300&width=300&query=product image'
									}
									alt={product.name}
									className="w-full h-full object-cover"
								/>
							</div>

							{/* Details Below */}
							<div className="p-6 flex flex-col justify-between flex-1">
								<div className="space-y-4">
									{/* Product Name */}
									<h3 className="text-xl font-semibold text-foreground">
										{product.name}
									</h3>

									{/* Description */}
									<p className="text-muted-foreground text-sm">
										{product.description}
									</p>

									{/* Categories */}
									<div className="flex flex-wrap gap-2">
										{product.categories?.map((category, index) => (
											<Badge
												key={index}
												variant="secondary"
												style={{
													backgroundColor: category.color + '20',
													color: category.color,
												}}
												className="text-xs"
											>
												{category.name}
											</Badge>
										))}
									</div>

									{/* Price */}
									<div className="text-2xl font-bold text-foreground">
										${product.amount}
									</div>

									{/* Stock Status */}
									<div className="flex items-center gap-2">
										<div
											className={`w-2 h-2 rounded-full ${
												product.available && product.quantity > 0
													? 'bg-green-500'
													: 'bg-red-500'
											}`}
										></div>
										<span
											className={`text-sm ${
												product.available && product.quantity > 0
													? 'text-green-600'
													: 'text-red-600'
											}`}
										>
											{product.available && product.quantity > 0
												? `In Stock (${product.quantity} available)`
												: 'Out of Stock'}
										</span>
									</div>

									{/* SKU */}
									<p className="text-xs text-muted-foreground">
										SKU: {product.sku}
									</p>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-3 mt-6">
									<Button
										variant="outline"
										className="flex-1 bg-transparent"
										onClick={() => handleAddToCart(product)}
										disabled={!product.available || product.quantity === 0}
									>
										Add to Cart
									</Button>
									<Button
										className="flex-1"
										onClick={() => handleBuyNow(product)}
										disabled={!product.available || product.quantity === 0}
									>
										Buy Now
									</Button>
								</div>
							</div>
						</div>
					</Card>
				))}
			</div>

			{/* Pagination */}
			{/* <Pagination
				page={userProducts.page}
				pageSize={userProducts.pageSize}
				total={pagination.total}
				onPageChange={pagination.onPageChange}
				onPageSizeChange={pagination.onPageSizeChange}
				pageSizeOptions={pagination.pageSizeOptions}
			/> */}
		</div>
	);
}
