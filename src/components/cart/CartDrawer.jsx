import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export const CartDrawer = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartOpen,
    closeCart
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here');
    closeCart();
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {getTotalItems() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getTotalItems()}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 space-y-4">
              <div className="rounded-full bg-gray-100 p-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">Your cart is empty</h3>
                <p className="text-gray-500 text-sm">Add some products to get started</p>
              </div>
              <Button onClick={closeCart} className="w-full">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <ScrollArea className="flex-1 -mx-6 px-6 py-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-sm leading-tight">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.product.brand}
                        </p>
                        {item.variant && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Color:</span>
                            <div className="flex items-center gap-1">
                              <div 
                                className="w-3 h-3 rounded-full border border-gray-200"
                                style={{ backgroundColor: item.variant.color }}
                              />
                              <span className="text-xs text-gray-600">{item.variant.name}</span>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {formatPrice(item.product.price)}
                          </span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium px-2">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-gray-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="space-y-4 pt-4 border-t">
                {/* Clear Cart */}
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full text-sm"
                >
                  Clear Cart
                </Button>

                <Separator />

                {/* Total */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Checkout ({getTotalItems()} items)
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};