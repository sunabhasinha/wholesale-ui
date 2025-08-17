import mockData from '../data/mockData.json';

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Generic data service that can be easily replaced with real API calls
export const dataService = {
	// Categories
	async getCategories() {
		await delay(500); // Simulate network delay
		return mockData.categories;
	},

	async getCategoryById(id) {
		await delay(300);
		const category = mockData.categories.find((cat) => cat.id === id);
		if (!category) throw new Error('Category not found');
		return category;
	},

	async createCategory(categoryData) {
		await delay(800);
		const newCategory = {
			...categoryData,
			id: Date.now().toString(),
			productCount: 0,
		};
		// In real API, this would make a POST request
		return newCategory;
	},

	async updateCategory(id, categoryData) {
		await delay(600);
		// In real API, this would make a PUT/PATCH request
		return { ...categoryData, id };
	},

	async deleteCategory(id) {
		await delay(400);
		// In real API, this would make a DELETE request
		return { success: true };
	},

	// Products
	async getProducts() {
		await delay(700);
		return mockData.products;
	},

	async getProductById(id) {
		await delay(300);
		const product = mockData.products.find((prod) => prod.id === id);
		if (!product) throw new Error('Product not found');
		return product;
	},

	async createProduct(productData) {
		await delay(900);
		const newProduct = {
			...productData,
			id: Date.now().toString(),
		};
		// In real API, this would make a POST request
		return newProduct;
	},

	async updateProduct(id, productData) {
		await delay(600);
		// In real API, this would make a PUT/PATCH request
		return { ...productData, id };
	},

	async deleteProduct(id) {
		await delay(400);
		// In real API, this would make a DELETE request
		return { success: true };
	},
};
