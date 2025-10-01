
import { useState, useCallback } from "react";

export function useAddProductStore() {
  const [product, setProductState] = useState(null);

  const setProduct = useCallback(({ product }) => {
    setProductState(product);
  }, []);
  const clean = useCallback(() => {
    setProductState(null);
  }, []);

  return {
    product,
    setProduct,
    clean,
  };
}
