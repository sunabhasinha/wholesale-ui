import { Eye, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { useFetch } from '../hooks/useApi';
import { dataService } from '../services/dataService';

const ProductsPage = () => {
	const {
		data: products,
		loading: productsLoading,
		error: productsError,
	} = useFetch(() => dataService.getProducts());
	const {
		data: categories,
		loading: categoriesLoading,
		error: categoriesError,
	} = useFetch(() => dataService.getCategories());

	const getCategoryById = (categoryId) => {
		return categories?.find((cat) => cat.id === categoryId);
	};

	const loading = productsLoading || categoriesLoading;
	const error = productsError || categoriesError;

	if (loading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Products</h1>
						<p className="text-muted-foreground">Loading products...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Products</h1>
						<p className="text-destructive">Error: {error}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Products</h1>
					<p className="text-muted-foreground">Manage your product inventory</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products?.map((product) => (
					<Card key={product.id} className="overflow-hidden">
						<div className="aspect-video bg-muted relative overflow-hidden">
							{product.imageUrl ? (
								<img
									src={product.imageUrl || '/placeholder.svg'}
									alt={product.name}
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center bg-muted">
									<span className="text-muted-foreground">No image</span>
								</div>
							)}
						</div>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">{product.name}</CardTitle>
							<CardDescription className="line-clamp-2">
								{product.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<div className="flex flex-wrap gap-1">
									{product.categoryIds.map((categoryId) => {
										const category = getCategoryById(categoryId);
										return category ? (
											<Badge
												key={categoryId}
												variant="secondary"
												style={{
													backgroundColor: category.color + '20',
													color: category.color,
													borderColor: category.color + '40',
												}}
											>
												{category.label}
											</Badge>
										) : null;
									})}
								</div>

								<div className="flex items-center justify-between">
									<div>
										<p className="text-2xl font-bold">${product.price}</p>
										<p className="text-sm text-muted-foreground">
											Stock: {product.stock}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-2 pt-2">
									<Button
										variant="outline"
										size="sm"
										className="flex-1 bg-transparent"
									>
										<Eye className="h-4 w-4 mr-2" />
										View
									</Button>
									<Button size="sm" className="flex-1">
										<ShoppingCart className="h-4 w-4 mr-2" />
										Add to Cart
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default ProductsPage;
