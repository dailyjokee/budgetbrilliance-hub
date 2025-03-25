
// Product types
export type ProductCategory = 'raw' | 'finished' | 'packaging' | 'other';
export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  category: ProductCategory;
  quantity: number;
  unit: string;
  cost: number;
  price?: number;
  reorderLevel: number;
  status: ProductStatus;
  supplierId?: string;
  createdAt: string;
  updatedAt: string;
}

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Paper',
    description: 'High-quality printing paper',
    sku: 'PP-001',
    category: 'raw',
    quantity: 500,
    unit: 'sheets',
    cost: 0.05,
    reorderLevel: 100,
    status: 'active',
    supplierId: '1',
    createdAt: '2023-01-15',
    updatedAt: '2023-04-20'
  },
  {
    id: '2',
    name: 'Business Cards',
    description: 'Premium business cards with logo',
    sku: 'BC-100',
    category: 'finished',
    quantity: 1000,
    unit: 'pcs',
    cost: 0.15,
    price: 0.50,
    reorderLevel: 200,
    status: 'active',
    createdAt: '2023-02-10',
    updatedAt: '2023-05-01'
  },
  {
    id: '3',
    name: 'Cardboard Boxes',
    description: 'Shipping boxes - medium size',
    sku: 'BOX-M',
    category: 'packaging',
    quantity: 50,
    unit: 'pcs',
    cost: 1.20,
    reorderLevel: 25,
    status: 'active',
    supplierId: '2',
    createdAt: '2023-03-05',
    updatedAt: '2023-04-15'
  },
  {
    id: '4',
    name: 'Ink Cartridge - Black',
    description: 'Black ink for printer model XYZ',
    sku: 'INK-BLK',
    category: 'raw',
    quantity: 10,
    unit: 'pcs',
    cost: 15.99,
    reorderLevel: 5,
    status: 'active',
    supplierId: '3',
    createdAt: '2023-01-20',
    updatedAt: '2023-05-10'
  },
  {
    id: '5',
    name: 'Custom Stickers',
    description: 'Waterproof vinyl stickers',
    sku: 'STK-CUS',
    category: 'finished',
    quantity: 300,
    unit: 'sheets',
    cost: 0.75,
    price: 2.50,
    reorderLevel: 50,
    status: 'active',
    createdAt: '2023-04-01',
    updatedAt: '2023-05-05'
  }
];

// Service functions
export const getProducts = async (): Promise<Product[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleProducts), 500);
  });
};

export const getProduct = async (id: string): Promise<Product | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleProducts.find(p => p.id === id)), 500);
  });
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  // Simulate API call
  return new Promise((resolve) => {
    const now = new Date().toISOString();
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: now,
      updatedAt: now
    };
    
    setTimeout(() => resolve(newProduct), 500);
  });
};

export const updateProduct = async (product: Product): Promise<Product> => {
  // Simulate API call
  return new Promise((resolve) => {
    const updatedProduct = {
      ...product,
      updatedAt: new Date().toISOString()
    };
    
    setTimeout(() => resolve(updatedProduct), 500);
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};
