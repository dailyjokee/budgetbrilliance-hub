
export type ProductCategory = 'raw' | 'finished' | 'packaging' | 'other';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  description: string;
  quantity: number;
  unit: string;
  cost: number;
  price: number;
  reorderLevel: number;
  status: 'active' | 'inactive';
}

// Mock data and functions
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Widget A',
    sku: 'WDG-001',
    category: 'finished',
    description: 'A high-quality widget',
    quantity: 25,
    unit: 'piece',
    cost: 10.50,
    price: 24.99,
    reorderLevel: 10,
    status: 'active',
  },
  {
    id: '2',
    name: 'Raw Material B',
    sku: 'RM-002',
    category: 'raw',
    description: 'Raw material for manufacturing',
    quantity: 150,
    unit: 'kg',
    cost: 5.25,
    price: 0,
    reorderLevel: 50,
    status: 'active',
  },
];

export const getProducts = async (): Promise<Product[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts.find(product => product.id === id)), 500);
  });
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  // Simulate API call
  const newProduct = {
    ...product,
    id: Date.now().toString(),
  };
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(newProduct), 500);
  });
};

export const updateProduct = async (product: Product): Promise<Product> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(product), 500);
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};
