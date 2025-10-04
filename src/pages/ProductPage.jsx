import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Star, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  ShoppingBag,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  getProductById, 
  getProductsByCategory,
  categories 
} from '../data/mockData';
import { cn } from '../lib/utils';

export const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const loadProduct = () => {
      setIsLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const productData = getProductById(productId);
        if (productData) {
          setProduct(productData);
          setSelectedVariant(productData.variants?.[0] || null);
          
          // Load related products
          const related = getProductsByCategory(productData.category)
            .filter(p => p.id !== productId)
            .slice(0, 8);
          setRelatedProducts(related);
        }
        setIsLoading(false);
      }, 500);
    };

    loadProduct();
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [productId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-4 w-4',
          i < Math.floor(rating)
            ? 'text-yellow-500 fill-current'
            : 'text-gray-300'
        )}
      />
    ));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    // Simulate add to cart delay
    setTimeout(() => {
      addToCart(product, selectedVariant, quantity);
      setIsAddingToCart(false);
    }, 500);
  };

  const nextImage = () => {
    if (product?.images) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-12">
          <LoadingSpinner size="xl" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/search')}>
            Browse All Products
          </Button>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.category);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        {category && (
          <>
            <Link to={`/category/${category.slug}`} className="hover:text-gray-900">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6"
        data-testid="back-btn"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image navigation */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-green-500">NEW</Badge>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <Badge variant="destructive">SALE</Badge>
              )}
            </div>
          </div>

          {/* Thumbnail images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    'flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors',
                    selectedImageIndex === index
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="product-title">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600">{product.brand}</p>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-600">
                {product.rating}
                {product.reviewCount && ` (${product.reviewCount} reviews)`}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900" data-testid="product-price">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-sm text-green-600 font-medium">
                Save {formatPrice(product.originalPrice - product.price)} 
                ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
              </div>
            )}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Color: {selectedVariant?.name}
              </Label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 border rounded-md transition-colors',
                      selectedVariant?.id === variant.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300',
                      !variant.inStock && 'opacity-50 cursor-not-allowed'
                    )}
                    onClick={() => variant.inStock && setSelectedVariant(variant)}
                    disabled={!variant.inStock}
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: variant.color }}
                    />
                    <span className="text-sm">{variant.name}</span>
                    {!variant.inStock && (
                      <span className="text-xs text-gray-500">(Out of stock)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quantity</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium px-4" data-testid="quantity-display">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleAddToCart}
              className="w-full h-12 text-lg"
              disabled={isAddingToCart || (selectedVariant && !selectedVariant.inStock)}
              data-testid="add-to-cart-btn"
            >
              {isAddingToCart ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Adding to Cart...
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Product Features */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                {product.features ? (
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No detailed features available for this product.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500">
                  <p>No reviews yet. Be the first to review this product!</p>
                  <Button className="mt-4" disabled={!isAuthenticated}>
                    Write a Review
                  </Button>
                  {!isAuthenticated && (
                    <p className="text-sm text-gray-400 mt-2">Please login to write a review</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Similar Products
            </h2>
            <p className="text-gray-600">
              You might also like these products
            </p>
          </div>
          
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};