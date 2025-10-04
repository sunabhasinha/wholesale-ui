import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { 
  Search, 
  Filter, 
  X, 
  Star,
  SlidersHorizontal 
} from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { 
  searchProducts, 
  categories, 
  getAllBrands 
} from '../data/mockData';
import { cn } from '../lib/utils';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    subcategory: searchParams.get('subcategory') || '',
    brands: [],
    minPrice: 0,
    maxPrice: 2000,
    minRating: 0,
    sortBy: searchParams.get('sort') || 'relevance'
  });

  const allBrands = getAllBrands();

  useEffect(() => {
    const performSearch = () => {
      setIsLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const results = searchProducts(searchQuery, filters);
        setProducts(results);
        setIsLoading(false);
      }, 500);
    };

    performSearch();
  }, [searchQuery, filters]);

  useEffect(() => {
    // Update URL params
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('q', searchQuery);
    if (filters.category) params.set('category', filters.category);
    if (filters.subcategory) params.set('subcategory', filters.subcategory);
    if (filters.sortBy !== 'relevance') params.set('sort', filters.sortBy);
    
    setSearchParams(params, { replace: true });
  }, [searchQuery, filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleBrandToggle = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      subcategory: '',
      brands: [],
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = () => {
    return filters.category || 
           filters.subcategory || 
           filters.brands.length > 0 || 
           filters.minPrice > 0 || 
           filters.maxPrice < 2000 || 
           filters.minRating > 0;
  };

  const renderFilters = () => (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Separator />

      {/* Active Filters */}
      {hasActiveFilters() && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Active Filters</Label>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <Badge variant="secondary" className="gap-1">
                {categories.find(c => c.slug === filters.category)?.name}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleFilterChange('category', '')}
                />
              </Badge>
            )}
            {filters.brands.map(brand => (
              <Badge key={brand} variant="secondary" className="gap-1">
                {brand}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleBrandToggle(brand)}
                />
              </Badge>
            ))}
            {filters.minRating > 0 && (
              <Badge variant="secondary" className="gap-1">
                {filters.minRating}+ Stars
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleFilterChange('minRating', 0)}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <Label>Categories</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <Button
                variant={filters.category === category.slug ? "default" : "ghost"}
                className="w-full justify-start text-sm font-normal"
                onClick={() => handleFilterChange('category', 
                  filters.category === category.slug ? '' : category.slug
                )}
              >
                {category.name}
              </Button>
              
              {/* Subcategories */}
              {filters.category === category.slug && category.subcategories && (
                <div className="ml-4 mt-2 space-y-1">
                  {category.subcategories.map((sub) => (
                    <Button
                      key={sub.id}
                      variant={filters.subcategory === sub.slug ? "secondary" : "ghost"}
                      className="w-full justify-start text-xs font-normal h-8"
                      onClick={() => handleFilterChange('subcategory',
                        filters.subcategory === sub.slug ? '' : sub.slug
                      )}
                    >
                      {sub.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-3">
        <Label>Brands</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <Label 
                htmlFor={`brand-${brand}`} 
                className="text-sm font-normal cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label>Price Range</Label>
        <div className="px-2">
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) => {
              handleFilterChange('minPrice', min);
              handleFilterChange('maxPrice', max);
            }}
            max={2000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-3">
        <Label>Minimum Rating</Label>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={filters.minRating === rating ? "secondary" : "ghost"}
              className="w-full justify-start text-sm font-normal"
              onClick={() => handleFilterChange('minRating', 
                filters.minRating === rating ? 0 : rating
              )}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                    )}
                  />
                ))}
                <span className="ml-1">& Up</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Search</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>({products.length} results)</span>
          </div>
        </div>

        {/* Mobile Filter Button & Sort */}
        <div className="flex items-center justify-between gap-4">
          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters() && (
                  <Badge variant="destructive" className="ml-2 px-1 h-4 text-xs">
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                {renderFilters()}
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Best Match</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderFilters()}
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
};