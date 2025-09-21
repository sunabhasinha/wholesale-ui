import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import AdminLayout from './components/admin-layout';
import CategoriesPage from './components/categories-page';
import CreateCategoryPage from './components/create-category-page';
import ProductsPage from './components/products-page';
import CreateProductPage from './components/create-product-page';

function App() {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			enableSystem
			disableTransitionOnChange
		>
			<Router>
				<AdminLayout>
					<Routes>
						<Route path="/" element={<Navigate to="/" replace />} />
						<Route path="/categories" element={<CategoriesPage />} />
						<Route path="/categories/create" element={<CreateCategoryPage />} />
						<Route path="/products" element={<ProductsPage />} />
						<Route path="/products/create" element={<CreateProductPage />} />
					</Routes>
				</AdminLayout>
			</Router>
		</ThemeProvider>
	);
}

export default App;
