import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { 
  heroSections, 
  getFeaturedProducts, 
  getNewProducts,
  categories,
  getProductById 
} from '../data/mockData';
import { cn } from '../lib/utils';

export const HomePage = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setFeaturedProducts(getFeaturedProducts());
      setNewProducts(getNewProducts().slice(0, 8)); // Show first 8 new products
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-advance hero carousel
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroSections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroSections.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroSections.length) % heroSections.length);
  };

  const currentHero = heroSections[currentHeroIndex];
  const featuredProduct = getProductById(currentHero.productId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={currentHero.image}
            alt={currentHero.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Text content */}
              <div className="text-white space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {currentHero.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200">
                  {currentHero.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
                    <Link to={`/category/${currentHero.category}`}>
                      {currentHero.ctaText}
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    <Link to="/search">
                      Browse All Categories
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right side - Featured product */}
              {featuredProduct && (
                <div className="flex justify-center lg:justify-end">
                  <Card className="w-full max-w-sm bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <Link to={`/product/${featuredProduct.id}`} className="block group">
                        <div className="aspect-square overflow-hidden rounded-lg mb-4">
                          <img
                            src={featuredProduct.images[0]}
                            alt={featuredProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{featuredProduct.name}</h3>
                          <p className="text-gray-600">{featuredProduct.brand}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xl">
                              From ${featuredProduct.price.toFixed(2)}
                            </span>
                            <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
          onClick={prevHero}
          data-testid="hero-prev-btn"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
          onClick={nextHero}
          data-testid="hero-next-btn"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSections.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-200',
                index === currentHeroIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              onClick={() => setCurrentHeroIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Fresh styles, just dropped
            </p>
          </div>

          <ProductGrid products={newProducts} className="mb-8" />

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/search?sort=newest">
                View all new arrivals
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our curated collections
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group block"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        Shop Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg">
                Hand-picked favorites from our collection
              </p>
            </div>

            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}
    </div>
  );
};