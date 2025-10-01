import mockData from '../data/mockData.json';

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Generic data service that can be easily replaced with real API calls
export const cartService = {
    // Products
    async getCart() {
        await delay(700);
        return mockData.cart;
    },

    async addCartItem(productId, quantity = 1) {
        await delay(700);   
        const newCartItem = {
			productId,
			quantity: quantity,
		};
		return { ok: true, ...newCartItem };
    },

};
