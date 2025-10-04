// Mock data for the e-commerce app

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
    subcategories: [
      { id: 'audio', name: 'Audio Devices', slug: 'audio' },
      { id: 'laptops', name: 'Laptops', slug: 'laptops' },
      { id: 'smartphones', name: 'Smartphones', slug: 'smartphones' }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
    subcategories: [
      { id: 'mens', name: 'Men\'s Fashion', slug: 'mens' },
      { id: 'womens', name: 'Women\'s Fashion', slug: 'womens' },
      { id: 'kids', name: 'Kids Fashion', slug: 'kids' }
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
    subcategories: [
      { id: 'perfumes', name: 'Perfumes', slug: 'perfumes' },
      { id: 'makeup', name: 'Makeup', slug: 'makeup' },
      { id: 'skincare', name: 'Skincare', slug: 'skincare' }
    ]
  },
  {
    id: 'outdoor',
    name: 'Sports & Outdoors',
    slug: 'outdoor',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    subcategories: [
      { id: 'outdoor-gear', name: 'Outdoor Gear', slug: 'outdoor-gear' },
      { id: 'sportswear', name: 'Sportswear', slug: 'sportswear' }
    ]
  }
];

export const products = [
  // Electronics - Audio
  {
    id: 'sync-sound-tower',
    name: 'Synchronic Sound Tower',
    brand: 'PixelEvolve',
    category: 'electronics',
    subcategory: 'audio',
    price: 278.00,
    originalPrice: 320.00,
    rating: 4.5,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&h=800&fit=crop'
    ],
    description: 'Immerse yourself in a new dimension of sound with the PixelEvolve Synchronic Sound Tower. This sleek tower speaker delivers crystal-clear audio quality and deep bass.',
    features: [
      'Crystal-clear audio quality',
      'Deep bass enhancement',
      'Bluetooth connectivity',
      'Touch controls',
      'Sleek tower design'
    ],
    variants: [
      { id: 'red', name: 'Red', color: '#dc2626', inStock: true },
      { id: 'black', name: 'Black', color: '#1f2937', inStock: true },
      { id: 'orange', name: 'Orange', color: '#ea580c', inStock: false }
    ],
    isNew: true,
    isFeatured: true
  },
  {
    id: 'beatpods-wireless',
    name: 'BeatPods Wireless',
    brand: 'InnovaSphere',
    category: 'electronics',
    subcategory: 'audio',
    price: 162.00,
    rating: 4.3,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop'
    ],
    description: 'Premium wireless earbuds with active noise cancellation and premium sound quality.',
    variants: [
      { id: 'white', name: 'White', color: '#ffffff', inStock: true },
      { id: 'black', name: 'Black', color: '#1f2937', inStock: true },
      { id: 'green', name: 'Green', color: '#16a34a', inStock: true }
    ],
    isNew: true
  },
  {
    id: 'thunderblast-speaker',
    name: 'ThunderBlast Portable Speaker',
    brand: 'TitaniumWave',
    category: 'electronics',
    subcategory: 'audio',
    price: 723.00,
    rating: 4.7,
    reviewCount: 32,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop'
    ],
    description: 'Professional-grade portable speaker with thunderous bass and crystal-clear highs.',
    variants: [
      { id: 'black', name: 'Black', color: '#1f2937', inStock: true },
      { id: 'blue', name: 'Blue', color: '#2563eb', inStock: true }
    ],
    isFeatured: true
  },

  // Electronics - Laptops
  {
    id: 'infinity-laptop',
    name: 'Infinity Gaming Laptop',
    brand: 'AetherGlow',
    category: 'electronics',
    subcategory: 'laptops',
    price: 1299.00,
    originalPrice: 1499.00,
    rating: 4.6,
    reviewCount: 45,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop'
    ],
    description: 'Ultimate gaming laptop with RTX 4070 graphics and Intel i7 processor.',
    features: [
      'Intel Core i7 12th Gen',
      'RTX 4070 Graphics',
      '16GB DDR5 RAM',
      '1TB NVMe SSD',
      '15.6" 144Hz Display'
    ],
    variants: [
      { id: 'black', name: 'Black', color: '#1f2937', inStock: true },
      { id: 'silver', name: 'Silver', color: '#64748b', inStock: true }
    ],
    isNew: true
  },

  // Fashion - Women's
  {
    id: 'lace-mermaid-skirt',
    name: 'Luminous Lace Mermaid Skirt',
    brand: 'ElegantWave',
    category: 'fashion',
    subcategory: 'womens',
    price: 471.00,
    rating: 4.4,
    reviewCount: 12,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=800&h=800&fit=crop'
    ],
    description: 'Elegant mermaid skirt with intricate lace detailing, perfect for special occasions.',
    variants: [
      { id: 'emerald', name: 'Emerald', color: '#10b981', inStock: true },
      { id: 'navy', name: 'Navy', color: '#1e40af', inStock: true },
      { id: 'burgundy', name: 'Burgundy', color: '#991b1b', inStock: false }
    ]
  },
  {
    id: 'embroidered-gown',
    name: 'Midnight Petal Embroidered Gown',
    brand: 'LuxFashion',
    category: 'fashion',
    subcategory: 'womens',
    price: 849.00,
    rating: 4.8,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1566479179817-c0b9e8ae0b7d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585487000143-66b1526316dc?w=800&h=800&fit=crop'
    ],
    description: 'Stunning evening gown with hand-embroidered floral patterns.',
    variants: [
      { id: 'midnight', name: 'Midnight Blue', color: '#1e3a8a', inStock: true },
      { id: 'rose', name: 'Rose Gold', color: '#be185d', inStock: true }
    ],
    isFeatured: true
  },

  // Fashion - Kids
  {
    id: 'kids-high-tops',
    name: 'Neon Dreams Kids High-Tops',
    brand: 'Urban Vogue',
    category: 'fashion',
    subcategory: 'kids',
    price: 89.00,
    rating: 4.2,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop'
    ],
    description: 'Colorful and comfortable high-top sneakers perfect for active kids.',
    variants: [
      { id: 'neon-green', name: 'Neon Green', color: '#22c55e', inStock: true },
      { id: 'hot-pink', name: 'Hot Pink', color: '#ec4899', inStock: true },
      { id: 'electric-blue', name: 'Electric Blue', color: '#3b82f6', inStock: true }
    ],
    isNew: true
  },

  // Beauty - Perfumes
  {
    id: 'midnight-serenade',
    name: 'Midnight Serenade Eau de Parfum',
    brand: 'LuxeScents',
    category: 'beauty',
    subcategory: 'perfumes',
    price: 486.00,
    rating: 4.9,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop'
    ],
    description: 'An enchanting fragrance that captures the essence of midnight elegance with notes of jasmine, sandalwood, and vanilla.',
    features: [
      'Top notes: Bergamot, Pink Pepper',
      'Heart notes: Jasmine, Rose',
      'Base notes: Sandalwood, Vanilla, Musk',
      '100ml Eau de Parfum',
      'Long-lasting formula'
    ],
    variants: [
      { id: 'classic', name: 'Classic Bottle', inStock: true },
      { id: 'limited', name: 'Limited Edition', inStock: false }
    ],
    isFeatured: true
  },
  {
    id: 'velvet-lipstick',
    name: 'Velvet Matte Lipstick',
    brand: 'LuxeLips',
    category: 'beauty',
    subcategory: 'makeup',
    price: 45.00,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1631214540017-6b3e2a5d5428?w=800&h=800&fit=crop'
    ],
    description: 'Ultra-pigmented matte lipstick with a comfortable, non-drying formula.',
    variants: [
      { id: 'crimson', name: 'Crimson Red', color: '#dc2626', inStock: true },
      { id: 'berry', name: 'Berry Crush', color: '#831843', inStock: true },
      { id: 'nude', name: 'Nude Rose', color: '#d97706', inStock: true }
    ]
  },

  // Sports & Outdoors
  {
    id: 'whitewater-kayak',
    name: 'RapidRush Inflatable Whitewater Kayak',
    brand: 'AquaAdventure',
    category: 'outdoor',
    subcategory: 'outdoor-gear',
    price: 983.00,
    rating: 4.7,
    reviewCount: 23,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop'
    ],
    description: 'Professional-grade inflatable kayak designed for whitewater adventures and extreme conditions.',
    features: [
      'Reinforced PVC construction',
      'Self-bailing drainage system',
      'Adjustable foot braces',
      'Includes paddle and pump',
      'Weight capacity: 250 lbs'
    ],
    variants: [
      { id: 'red', name: 'Adventure Red', color: '#dc2626', inStock: true },
      { id: 'blue', name: 'Ocean Blue', color: '#2563eb', inStock: true }
    ],
    isFeatured: true
  },
  {
    id: 'pro-cleats',
    name: 'ThunderForce Pro-Traction Cleats',
    brand: 'SportElite',
    category: 'outdoor',
    subcategory: 'sportswear',
    price: 342.00,
    rating: 4.5,
    reviewCount: 41,
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=800&fit=crop'
    ],
    description: 'Professional soccer cleats with advanced traction technology for superior performance.',
    variants: [
      { id: 'black', name: 'Classic Black', color: '#1f2937', inStock: true },
      { id: 'green', name: 'Electric Green', color: '#16a34a', inStock: true },
      { id: 'orange', name: 'Volt Orange', color: '#ea580c', inStock: false }
    ]
  }
];

export const heroSections = [
  {
    id: 'adventure',
    title: 'Adventure Awaits',
    subtitle: 'Gear up for your next outdoor expedition with premium equipment',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop',
    category: 'outdoor',
    productId: 'whitewater-kayak',
    ctaText: 'Shop Outdoor Gear'
  },
  {
    id: 'scents',
    title: 'Signature Scents',
    subtitle: 'Discover fragrances that capture your essence',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&h=800&fit=crop',
    category: 'beauty',
    productId: 'midnight-serenade',
    ctaText: 'Explore Perfumes'
  },
  {
    id: 'fashion',
    title: 'Bold & Beautiful',
    subtitle: 'Express yourself with our premium fashion collection',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1200&h=800&fit=crop',
    category: 'beauty',
    productId: 'velvet-lipstick',
    ctaText: 'Shop Beauty'
  },
  {
    id: 'tech',
    title: 'Sound On The Go',
    subtitle: 'Premium audio that moves with your lifestyle',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=800&fit=crop',
    category: 'electronics',
    productId: 'sync-sound-tower',
    ctaText: 'Shop Audio'
  }
];

// Utility functions
export const getProductById = (id) => products.find(p => p.id === id);
export const getProductsByCategory = (category) => products.filter(p => p.category === category);
export const getProductsBySubcategory = (subcategory) => products.filter(p => p.subcategory === subcategory);
export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getNewProducts = () => products.filter(p => p.isNew);
export const getCategoryBySlug = (slug) => categories.find(c => c.slug === slug);

export const searchProducts = (query, filters = {}) => {
  let filteredProducts = [...products];
  
  // Text search
  if (query) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // Category filter
  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }
  
  // Subcategory filter
  if (filters.subcategory) {
    filteredProducts = filteredProducts.filter(p => p.subcategory === filters.subcategory);
  }
  
  // Price range filter
  if (filters.minPrice || filters.maxPrice) {
    filteredProducts = filteredProducts.filter(p => {
      const price = p.price;
      const minMatch = !filters.minPrice || price >= filters.minPrice;
      const maxMatch = !filters.maxPrice || price <= filters.maxPrice;
      return minMatch && maxMatch;
    });
  }
  
  // Rating filter
  if (filters.minRating) {
    filteredProducts = filteredProducts.filter(p => p.rating >= filters.minRating);
  }
  
  // Brand filter
  if (filters.brands && filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter(p => filters.brands.includes(p.brand));
  }
  
  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
  }
  
  return filteredProducts;
};

export const getAllBrands = () => {
  const brands = [...new Set(products.map(p => p.brand))];
  return brands.sort();
};