import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ProductGrid } from '../components/product/ProductGrid';
import { 
  categories,
  getProductsByCategory,
  getProductsBySubcategory,
  getCategoryBySlug 
} from '../data/mockData';

export const CategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategoryData = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const categoryData = getCategoryBySlug(categorySlug);
        setCategory(categoryData);
        
        if (subcategorySlug && categoryData) {
          const subcategoryData = categoryData.subcategories?.find(
            sub => sub.slug === subcategorySlug
          );
          setSubcategory(subcategoryData);
          
          if (subcategoryData) {
            const subcategoryProducts = getProductsBySubcategory(subcategoryData.id);
            setProducts(subcategoryProducts);
          }
        } else if (categoryData) {
          const categoryProducts = getProductsByCategory(categoryData.id);
          setProducts(categoryProducts);
        }
        
        setIsLoading(false);
      }, 500);
    };

    loadCategoryData();
  }, [categorySlug, subcategorySlug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-12">
          <LoadingSpinner size="xl" />
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Category Not Found</h2>
          <Button asChild>
            <Link to="/search">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentTitle = subcategory ? subcategory.name : category.name;
  const currentDescription = subcategory 
    ? `Discover our ${subcategory.name.toLowerCase()} collection`
    : `Explore our ${category.name.toLowerCase()} category`;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link to={`/category/${category.slug}`} className="hover:text-gray-900">
            {category.name}
          </Link>
          {subcategory && (
            <>
              <span>/</span>
              <span className="text-gray-900">{subcategory.name}</span>
            </>
          )}
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative h-64 md:h-80 mb-12">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={currentTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              {currentTitle}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              {currentDescription}
            </p>
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {products.length} Product{products.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-12">
        {/* Subcategories (only show if viewing main category) */}
        {!subcategory && category.subcategories && category.subcategories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/category/${category.slug}/${sub.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-medium text-sm group-hover:text-blue-600 transition-colors">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {getProductsBySubcategory(sub.id).length} items
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Products Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {subcategory ? `${subcategory.name}` : `All ${category.name}`}
            </h2>
            <Button asChild variant="outline">
              <Link to={`/search?category=${category.slug}${subcategory ? `&subcategory=${subcategory.slug}` : ''}`}>
                View with Filters
              </Link>
            </Button>
          </div>

          <ProductGrid products={products} />

          {/* Show All Products Button */}
          {products.length > 12 && (
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link to={`/search?category=${category.slug}${subcategory ? `&subcategory=${subcategory.slug}` : ''}`}>
                  View All Products
                </Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};