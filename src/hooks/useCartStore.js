import { useState, useCallback } from "react";

export function useCartStore() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSheetLoaded, setIsSheetLoaded] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(0);
  const [cart, setCart] = useState(null);
  const [checkoutReady, setCheckoutReady] = useState(true);

  const openCart = useCallback(() => {
    setIsOpen(true);
    setIsSheetLoaded(true);
    setLastUpdatedAt(Date.now());
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
    setIsSheetLoaded(true);
    setLastUpdatedAt(Date.now());
  }, []);

  const preloadSheet = useCallback(() => {
    setIsSheetLoaded(true);
  }, []);

  const refresh = useCallback(() => {
    setLastUpdatedAt(Date.now());
  }, []);

  const setCartState = useCallback((payload) => {
    setCart(payload);
  }, []);

  const setCheckoutReadyState = useCallback((payload) => {
    setCheckoutReady(payload);
  }, []);

  return {
    isOpen,
    isSheetLoaded,
    lastUpdatedAt,
    cart,
    checkoutReady,
    openCart,
    closeCart,
    preloadSheet,
    refresh,
    setCart: setCartState,
    setCheckoutReady: setCheckoutReadyState,
  };
}