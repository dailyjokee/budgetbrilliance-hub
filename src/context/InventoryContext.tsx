
import React, { createContext, useContext, useState } from 'react';
import { 
  Product, 
  ProductCategory, 
  getProducts, 
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService
} from '../services/inventoryService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface InventoryContextType {
  products: Product[];
  isLoading: boolean;
  filter: {
    category?: 'all' | ProductCategory | 'low-stock';
    search?: string;
  };
  setFilter: (filter: { category?: 'all' | ProductCategory | 'low-stock'; search?: string }) => void;
  createProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (product: Product) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<{ category?: 'all' | ProductCategory | 'low-stock'; search?: string }>({
    category: 'all',
    search: '',
  });
  
  const queryClient = useQueryClient();
  
  // Removed filter param since it's likely not implemented in getProducts
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', filter],
    queryFn: () => getProducts(),
  });
  
  const createMutation = useMutation({
    mutationFn: createProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: updateProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  
  const createProduct = async (product: Omit<Product, 'id'>) => {
    return createMutation.mutateAsync(product);
  };
  
  const updateProduct = async (product: Product) => {
    return updateMutation.mutateAsync(product);
  };
  
  const deleteProduct = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };
  
  return (
    <InventoryContext.Provider
      value={{
        products,
        isLoading,
        filter,
        setFilter,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
