import React from 'react';
import { ProductCard } from './ProductCard';
import { cn } from '../../lib/utils';

export const ProductGrid = ({ products, className, ...props }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
        className
      )}
      {...props}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};