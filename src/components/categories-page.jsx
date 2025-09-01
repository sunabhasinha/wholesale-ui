'use client';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { useFetch, useApi } from '../hooks/useApi';
import { dataService } from '../services/dataService';
import { ecommerceAPI } from '../services/api';

const CategoriesPage = () => {
	const {
		data: categories,
		loading: categoriesLoading,
		error: categoriesError,
		refetch: refetchCategories,
	} = useFetch(() => ecommerceAPI.getCategories());
	const {
		data: products,
		loading: productsLoading,
		error: productsError,
	} = useFetch(() => ecommerceAPI.getProducts());
	const { execute: executeDelete, loading: deleteLoading } = useApi();

	const handleDeleteCategory = async (categoryId) => {
		if (window.confirm('Are you sure you want to delete this category?')) {
			try {
				await executeDelete(() => dataService.deleteCategory(categoryId));
				refetchCategories(); // Refresh categories after deletion
			} catch (err) {
				console.error('Failed to delete category:', err);
			}
		}
	};

	const getCategoryProducts = (categoryId) => {
		if (!products) return [];
		return products.filter((product) =>
			product.categoryIds?.includes(categoryId)
		);
	};

	const loading = categoriesLoading || productsLoading;
	const error = categoriesError || productsError;

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-lg">Loading categories...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-lg text-red-500">Error: {error}</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Categories</h1>
					<p className="text-muted-foreground">
						Organize your products by categories
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories?.map((category) => {
					const categoryProducts = getCategoryProducts(category.id);
					const sampleProduct = categoryProducts[0];

					return (
						<Card key={category.id} className="relative">
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div
											className="w-4 h-4 rounded-full"
											style={{ backgroundColor: category.color }}
										/>
										<CardTitle className="text-xl">{category.label}</CardTitle>
									</div>
									<div className="flex items-center gap-1">
										<Button variant="ghost" size="icon" className="h-8 w-8">
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8"
											onClick={() => handleDeleteCategory(category.id)}
											disabled={deleteLoading}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
								<CardDescription>{category.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-muted">
											{categoryProducts.length} products
										</span>
										<span
											className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
											style={{
												backgroundColor: category.color + '20',
												color: category.color,
											}}
										>
											{category.name}
										</span>
									</div>

									{sampleProduct && (
										<div className="pt-2 border-t">
											<p className="text-sm font-medium">
												Products in this category:
											</p>
											<div className="flex items-center justify-between mt-1">
												<span className="text-sm text-muted-foreground">
													{sampleProduct.name}
												</span>
												<span className="text-sm font-medium">
													${sampleProduct.price}
												</span>
											</div>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default CategoriesPage;
