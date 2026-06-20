import { useState, useEffect, useCallback } from 'react';
import { getProducts, getGlobalProducts } from '../services/googleSheetsApi.js';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [localData, globalData] = await Promise.all([
        getProducts(),
        getGlobalProducts()
      ]);
      setProducts([...localData, ...globalData]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchAllProducts,
  };
}
