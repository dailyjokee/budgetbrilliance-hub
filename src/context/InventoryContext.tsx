
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Product, getProducts, createProduct, updateProduct, deleteProduct } from '../services/inventoryService';

// Context type
interface InventoryContextType {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  refreshProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

// Create context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Provider component
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    setIsLoading(true);
    try {
      const newProduct = await createProduct(product);
      setProducts(prev => [newProduct, ...prev]);
      toast.success('Product created successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to create product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    setIsLoading(true);
    try {
      const updatedProduct = await updateProduct(product);
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      toast.success('Product updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to update product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to delete product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const value = {
    products,
    isLoading,
    error,
    refreshProducts,
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct
  };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

// Hook for using the context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
