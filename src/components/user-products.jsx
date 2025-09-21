'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Pagination from '../components/ui/pagination';
import { useFetch } from '@/hooks/useApi';
import { ecommerceAPI } from '@/services/api';
// Sample products data based on your product object structure
const sampleProducts = [
	{
		id: '799e5b75-5754-4351-b420-a7dc169ab536',
		name: 'Item with image',
		description: 'Soap with image',
		amount: 100,
		quantity: 20,
		sku: 'ITM-2',
		available: true,
		images: [
			{
				sizes: [
					{
						url: 'https://dev-catalog-assets-common-bucket-ap-south-1-480693447517.s3.ap-south-1.amazonaws.com/processed/catalog/5ab84f02-6253-4606-a979-267b4c2f635e/0ed90a89-21ae-4a80-9435-fce872c8f8bc-thumbnail.png',
						size: 'THUMBNAIL',
					},
				],
			},
		],
		categories: [
			{
				name: 'ART',
				color: '#897654',
				label: 'ART',
			},
		],
	},
	// Add more sample products for demonstration
	{
		id: '2',
		name: 'Premium Headphones',
		description: 'High-quality wireless headphones',
		amount: 299,
		quantity: 15,
		sku: 'HP-001',
		available: true,
		images: [
			{
				sizes: [
					{
						url: '/premium-wireless-headphones.png',
						size: 'THUMBNAIL',
					},
				],
			},
		],
		categories: [
			{
				name: 'ELECTRONICS',
				color: '#4F46E5',
				label: 'ELECTRONICS',
			},
			{
				name: 'AUDIO',
				color: '#059669',
				label: 'AUDIO',
			},
		],
	},
	{
		id: '3',
		name: 'Organic Coffee Beans',
		description: 'Premium organic coffee beans from Colombia',
		amount: 25,
		quantity: 0,
		sku: 'CF-003',
		available: false,
		images: [
			{
				sizes: [
					{
						url: '/organic-coffee-beans-bag.jpg',
						size: 'THUMBNAIL',
					},
				],
			},
		],
		categories: [
			{
				name: 'FOOD',
				color: '#DC2626',
				label: 'FOOD',
			},
			{
				name: 'ORGANIC',
				color: '#16A34A',
				label: 'ORGANIC',
			},
		],
	},
	{
		id: '4',
		name: 'Yoga Mat',
		description: 'Non-slip yoga mat for all fitness levels',
		amount: 45,
		quantity: 30,
		sku: 'YM-004',
		available: true,
		images: [
			{
				sizes: [
					{
						url: '/purple-yoga-mat-fitness.jpg',
						size: 'THUMBNAIL',
					},
				],
			},
		],
		categories: [
			{
				name: 'FITNESS',
				color: '#7C3AED',
				label: 'FITNESS',
			},
		],
	},
	{
		id: '5',
		name: 'Ceramic Mug',
		description: 'Handcrafted ceramic mug with unique design',
		amount: 18,
		quantity: 25,
		sku: 'MG-005',
		available: true,
		images: [
			{
				sizes: [
					{
						url: '/handcrafted-ceramic-mug.png',
						size: 'THUMBNAIL',
					},
				],
			},
		],
		categories: [
			{
				name: 'HOME',
				color: '#EA580C',
				label: 'HOME',
			},
			{
				name: 'CERAMIC',
				color: '#0891B2',
				label: 'CERAMIC',
			},
		],
	},
];

export default function UserProductsPage() {
	const {
		data: userProducts,
		loading: userProductsLoading,
		error: userProductsError,
	} = useFetch(() => ecommerceAPI.getProducts());

	// Calculate pagination
	const [page, setPage] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(10);

	const total = userProducts?.length ?? 0;
	const start = (page - 1) * pageSize;
	const currentRows = userProducts?.slice(start, start + pageSize) ?? [];
	const handleAddToCart = (product) => {
		console.log('Adding to cart:', product.name);
		// Add your cart logic here
	};

	const handleBuyNow = (product) => {
		console.log('Buy now:', product.name);
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
				{userProducts.map((product) => (
					<Card key={product.id} className="overflow-hidden">
						<div className="flex flex-col">
							{/* Image at Top */}
							<div className="aspect-square">
								<img
									src={
										product.images?.[0]?.sizes?.[0]?.url ||
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
