'use client';
import React from 'react';
import { useFetch, useApi } from '../hooks/useApi';
import { dataService } from '../services/dataService';
import { ecommerceAPI } from '../services/api';
import DataTable from '../components/ui/dataTable';

const CategoriesPage = () => {
	const {
		data: categories,
		loading: categoriesLoading,
		error: categoriesError,
		refetch: refetchCategories,
	} = useFetch(() => ecommerceAPI.getCategories());
	const { execute: executeDelete } = useApi();

	const [page, setPage] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(10);

	const total = categories?.length ?? 0;
	const start = (page - 1) * pageSize;
	const currentRows = categories?.slice(start, start + pageSize) ?? [];

	const handleDeleteCategory = async (categoryId) => {
		if (window.confirm('Are you sure you want to delete this category?')) {
			try {
				await executeDelete(() => dataService.deleteCategory(categoryId));
				refetchCategories();
			} catch (err) {
				console.error('Failed to delete category:', err);
			}
		}
	};

	if (categoriesLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				Loading categories...
			</div>
		);
	}

	if (categoriesError) {
		return (
			<div className="flex items-center justify-center h-64 text-red-500">
				Error: {categoriesError}
			</div>
		);
	}

	const columns = [{ key: 'name', header: 'Category', align: 'left' }];

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

			<DataTable
				columns={columns}
				data={currentRows}
				getRowKey={(row) => row.id}
				leadingIconColumnKey="name"
				iconKey="icon"
				colorKey="color"
				emptyLabel="No categories found"
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

export default CategoriesPage;
