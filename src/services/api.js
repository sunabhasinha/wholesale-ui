import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
	baseURL: import.meta.env.VITE_WS_BASE_URL,
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		// Add auth token if available
		// const token = localStorage.getItem('authToken') || '';
		// if (token) {
		// 	config.headers.Authorization = `Bearer ${token}`;
		// }

		// Add request timestamp
		config.metadata = { startTime: new Date() };

		console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
		return config;
	},
	(error) => {
		console.error('[API Request Error]', error);
		return Promise.reject(error);
	}
);

// Response interceptor
api.interceptors.response.use(
	(response) => {
		// Calculate request duration
		const duration = new Date() - response.config.metadata.startTime;
		console.log(
			`[API Response] ${response.status} ${response.config.url} (${duration}ms)`
		);

		return response;
	},
	(error) => {
		const duration = error.config?.metadata
			? new Date() - error.config.metadata.startTime
			: 0;
		console.error(
			`[API Error] ${error.response?.status || 'Network Error'} ${
				error.config?.url
			} (${duration}ms)`,
			error.message
		);

		// Handle common error scenarios
		if (error.response?.status === 401) {
			// Handle unauthorized - redirect to login
			localStorage.removeItem('authToken');
			window.location.href = '/login';
		} else if (error.response?.status === 403) {
			// Handle forbidden
			console.warn('Access forbidden');
		} else if (error.response?.status >= 500) {
			// Handle server errors
			console.error('Server error occurred');
		}

		return Promise.reject(error);
	}
);

// Generic API service functions
export const apiService = {
	// Generic GET request
	get: async (endpoint, params = {}) => {
		try {
			const response = await api.get(endpoint, { params });
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Generic POST request
	post: async (endpoint, data = {}) => {
		try {
			const response = await api.post(endpoint, data);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Generic PUT request
	put: async (endpoint, data = {}) => {
		try {
			const response = await api.put(endpoint, data);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Generic DELETE request
	delete: async (endpoint) => {
		try {
			const response = await api.delete(endpoint);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Generic PATCH request
	patch: async (endpoint, data = {}) => {
		try {
			const response = await api.patch(endpoint, data);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

// Specific API endpoints for the ecommerce app
export const ecommerceAPI = {
	// Categories
	getCategories: () =>
		apiService.get('/entity/5ab84f02-6253-4606-a979-267b4c2f635e/category'),
	createCategory: (categoryData) =>
		apiService.post(
			'/entity/5ab84f02-6253-4606-a979-267b4c2f635e/category',
			categoryData
		),
	updateCategory: (id, categoryData) =>
		apiService.put(`/categories/${id}`, categoryData),
	deleteCategory: (id) => apiService.delete(`/categories/${id}`),

	// Products
	getProducts: (params) =>
		apiService.get('/entity/5ab84f02-6253-4606-a979-267b4c2f635e/item', params),
	getProduct: (id) => apiService.get(`/products/${id}`),
	createProduct: (productData) =>
		apiService.post(
			'/entity/5ab84f02-6253-4606-a979-267b4c2f635e/item',
			productData
		),
	getPresignedUrl: (payload) => {
		return apiService.post(
			'/entity/5ab84f02-6253-4606-a979-267b4c2f635e/image/upload',
			payload
		);
	},
	updateProduct: (id, productData) =>
		apiService.put(`/products/${id}`, productData),
	deleteProduct: (id) => apiService.delete(`/products/${id}`),

	// Search
	searchProducts: (query) => apiService.get('/products/search', { q: query }),
};

export default api;
