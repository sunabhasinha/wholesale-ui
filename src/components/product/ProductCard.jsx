import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Star, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ProductCard = ({ product, className }) => {
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
          'h-3 w-3',
          i < Math.floor(rating)
            ? 'text-yellow-500 fill-current'
            : 'text-gray-300'
        )}
      />
    ));
  };

  return (
    <Card className={cn('group overflow-hidden hover:shadow-lg transition-shadow duration-200', className)}>
      <CardContent className="p-0">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="bg-green-500 hover:bg-green-600">
                  NEW
                </Badge>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <Badge variant="destructive">
                  SALE
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle wishlist functionality
                alert('Added to wishlist!');
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-2">
            <div className="space-y-1">
              <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500">{product.brand}</p>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-xs text-gray-500">
                  {product.rating}
                  {product.reviewCount && ` (${product.reviewCount})`}
                </span>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">
                  {product.variants.length} variant{product.variants.length > 1 ? 's' : ''}
                </span>
                <div className="flex gap-1 ml-1">
                  {product.variants.slice(0, 3).map((variant) => (
                    <div
                      key={variant.id}
                      className="w-3 h-3 rounded-full border border-gray-200"
                      style={{ backgroundColor: variant.color }}
                      title={variant.name}
                    />
                  ))}
                  {product.variants.length > 3 && (
                    <div className="w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-600">+</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                From {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};