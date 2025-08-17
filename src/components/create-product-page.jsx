'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { useFetch, useApi } from '../hooks/useApi';
import { dataService } from '../services/dataService';

const CreateProductPage = () => {
	const navigate = useNavigate();
	const { data: categories } = useFetch(() => dataService.getCategories());
	const { execute: createProduct, loading } = useApi();

	const [formData, setFormData] = useState({
		name: '',
		price: '',
		stock: '',
		description: '',
		imageUrl: '',
		categoryIds: [],
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCategoryChange = (categoryId, checked) => {
		setFormData((prev) => ({
			...prev,
			categoryIds: checked
				? [...prev.categoryIds, categoryId]
				: prev.categoryIds.filter((id) => id !== categoryId),
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name.trim() || !formData.price || !formData.stock) return;

		try {
			await createProduct(() =>
				dataService.createProduct({
					name: formData.name,
					description: formData.description,
					price: Number.parseFloat(formData.price),
					stock: Number.parseInt(formData.stock),
					categoryIds: formData.categoryIds,
					imageUrl: formData.imageUrl || undefined,
				})
			);

			navigate('/products');
		} catch (error) {
			console.error('Failed to create product:', error);
		}
	};

	const handleCancel = () => {
		navigate('/products');
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => navigate('/products')}
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
					<p className="text-muted-foreground">
						Add a new product to your inventory
					</p>
				</div>
			</div>

			<Card className="max-w-2xl">
				<CardHeader>
					<CardTitle>Product Information</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name">
									Product Name <span className="text-destructive">*</span>
								</Label>
								<Input
									id="name"
									name="name"
									placeholder="Enter product name"
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="imageUrl">Image URL</Label>
								<Input
									id="imageUrl"
									name="imageUrl"
									placeholder="https://example.com/image.jpg"
									value={formData.imageUrl}
									onChange={handleInputChange}
								/>
								<p className="text-xs text-muted-foreground">
									Leave empty to use a default image
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="price">
									Price <span className="text-destructive">*</span>
								</Label>
								<Input
									id="price"
									name="price"
									type="number"
									step="0.01"
									placeholder="0.00"
									value={formData.price}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="stock">
									Stock Quantity <span className="text-destructive">*</span>
								</Label>
								<Input
									id="stock"
									name="stock"
									type="number"
									placeholder="0"
									value={formData.stock}
									onChange={handleInputChange}
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="Enter product description"
								value={formData.description}
								onChange={handleInputChange}
								rows={4}
							/>
						</div>

						<div className="space-y-3">
							<Label>Categories</Label>
							<div className="space-y-2">
								{categories?.map((category) => (
									<div
										key={category.id}
										className="flex items-center space-x-2"
									>
										<Checkbox
											id={category.id}
											checked={formData.categoryIds.includes(category.id)}
											onCheckedChange={(checked) =>
												handleCategoryChange(category.id, checked)
											}
										/>
										<Label
											htmlFor={category.id}
											className="flex items-center gap-2"
										>
											<div
												className="w-3 h-3 rounded-full"
												style={{ backgroundColor: category.color }}
											/>
											{category.label}
										</Label>
									</div>
								))}
							</div>
						</div>

						<div className="flex items-center gap-3 pt-4">
							<Button type="button" variant="outline" onClick={handleCancel}>
								Cancel
							</Button>
							<Button
								type="submit"
								className="flex items-center gap-2"
								disabled={loading}
							>
								<Plus className="h-4 w-4" />
								{loading ? 'Creating...' : 'Create Product'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default CreateProductPage;
