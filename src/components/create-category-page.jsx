'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useApi } from '../hooks/useApi';
import { dataService } from '../services/dataService';

const CreateCategoryPage = () => {
	const navigate = useNavigate();
	const { execute: executeCreate, loading, error } = useApi();
	const [formData, setFormData] = useState({
		label: '',
		name: '',
		description: '',
		color: '#3B82F6',
	});

	const presetColors = [
		'#3B82F6', // Blue
		'#EF4444', // Red
		'#10B981', // Green
		'#F59E0B', // Orange
		'#8B5CF6', // Purple
		'#EC4899', // Pink
		'#06B6D4', // Cyan
		'#84CC16', // Lime
		'#F97316', // Orange
		'#6366F1', // Indigo
	];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
			...(name === 'label' && {
				name: value
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^a-z0-9-]/g, ''),
			}),
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.label.trim()) return;

		try {
			await executeCreate(() =>
				dataService.createCategory({
					label: formData.label,
					name: formData.name,
					description: formData.description,
					color: formData.color,
				})
			);

			navigate('/categories');
		} catch (error) {
			console.error('Failed to create category:', error);
		}
	};

	const handleCancel = () => {
		navigate('/categories');
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => navigate('/categories')}
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
					<p className="text-muted-foreground">Add a new product category</p>
				</div>
			</div>

			<Card className="max-w-2xl">
				<CardHeader>
					<CardTitle>Category Information</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="label">
									Category Label <span className="text-destructive">*</span>
								</Label>
								<Input
									id="label"
									name="label"
									placeholder="Electronics, Clothing, Books..."
									value={formData.label}
									onChange={handleInputChange}
									required
								/>
								<p className="text-xs text-muted-foreground">
									Display name for the category
								</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="name">
									Category Name <span className="text-destructive">*</span>
								</Label>
								<Input
									id="name"
									name="name"
									placeholder="electronics, clothing, books..."
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
								<p className="text-xs text-muted-foreground">
									URL-friendly name (lowercase, no spaces)
								</p>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="Describe this category..."
								value={formData.description}
								onChange={handleInputChange}
								rows={3}
							/>
						</div>

						<div className="space-y-3">
							<Label>
								Category Color <span className="text-destructive">*</span>
							</Label>
							<div className="flex items-center gap-3">
								<div
									className="w-12 h-12 rounded-lg border-2 border-border"
									style={{ backgroundColor: formData.color }}
								/>
								<Input
									type="text"
									value={formData.color}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, color: e.target.value }))
									}
									className="w-32"
									placeholder="#3B82F6"
								/>
							</div>

							<div>
								<p className="text-sm text-muted-foreground mb-2">
									Preset colors:
								</p>
								<div className="flex flex-wrap gap-2">
									{presetColors.map((color) => (
										<button
											key={color}
											type="button"
											className={`w-8 h-8 rounded-full border-2 transition-all ${
												formData.color === color
													? 'border-foreground scale-110'
													: 'border-border hover:scale-105'
											}`}
											style={{ backgroundColor: color }}
											onClick={() =>
												setFormData((prev) => ({ ...prev, color }))
											}
										/>
									))}
								</div>
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
								{loading ? 'Creating...' : 'Create Category'}
							</Button>
						</div>
						{error && (
							<div className="text-sm text-red-500 mt-2">Error: {error}</div>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default CreateCategoryPage;
