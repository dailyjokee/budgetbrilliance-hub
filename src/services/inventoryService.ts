
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

interface ProductFilter {
  category?: 'all' | ProductCategory | 'low-stock';
  search?: string;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Office Paper',
    sku: 'PAP-001',
    category: 'finished',
    description: 'High-quality printer paper, 80gsm, A4 size',
    quantity: 500,
    unit: 'ream',
    cost: 2.50,
    price: 4.99,
    reorderLevel: 100,
    status: 'active',
  },
  {
    id: '2',
    name: 'Wood Pulp',
    sku: 'RAW-001',
    category: 'raw',
    description: 'Raw wood pulp for paper production',
    quantity: 1000,
    unit: 'kg',
    cost: 1.20,
    price: 0, // No direct sale price for raw materials
    reorderLevel: 200,
    status: 'active',
  },
  {
    id: '3',
    name: 'Cardboard Boxes',
    sku: 'PKG-001',
    category: 'packaging',
    description: 'Shipping boxes, medium size',
    quantity: 150,
    unit: 'piece',
    cost: 0.75,
    price: 1.50,
    reorderLevel: 50,
    status: 'active',
  },
  {
    id: '4',
    name: 'Colored Paper',
    sku: 'PAP-002',
    category: 'finished',
    description: 'Assorted color paper, 100gsm, A4 size',
    quantity: 25,
    unit: 'ream',
    cost: 3.50,
    price: 6.99,
    reorderLevel: 50,
    status: 'active',
  },
  {
    id: '5',
    name: 'Printer Ink',
    sku: 'SUP-001',
    category: 'other',
    description: 'Black printer ink cartridge',
    quantity: 15,
    unit: 'cartridge',
    cost: 12.00,
    price: 24.99,
    reorderLevel: 20,
    status: 'active',
  },
];

// Service functions
export const getProducts = async (filter: ProductFilter = {}): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProducts = [...mockProducts];
  
  // Apply category filter
  if (filter.category && filter.category !== 'all') {
    if (filter.category === 'low-stock') {
      filteredProducts = filteredProducts.filter(product => product.quantity <= product.reorderLevel);
    } else {
      filteredProducts = filteredProducts.filter(product => product.category === filter.category);
    }
  }
  
  // Apply search filter
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    });
  }
  
  return filteredProducts;
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
  };
  
  mockProducts.push(newProduct);
  
  return newProduct;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockProducts.findIndex(p => p.id === product.id);
  
  if (index !== -1) {
    mockProducts[index] = product;
    return product;
  }
  
  throw new Error('Product not found');
};

export const deleteProduct = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockProducts.findIndex(p => p.id === id);
  
  if (index !== -1) {
    mockProducts.splice(index, 1);
    return;
  }
  
  throw new Error('Product not found');
};
