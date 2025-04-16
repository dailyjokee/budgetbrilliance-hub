
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

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Office Paper',
    sku: 'PAP-001',
    category: 'finished',
    description: 'High-quality office paper for printing and copying',
    quantity: 500,
    unit: 'ream',
    cost: 3.50,
    price: 5.99,
    reorderLevel: 100,
    status: 'active'
  },
  {
    id: '2',
    name: 'Cardboard Boxes (Small)',
    sku: 'BOX-S01',
    category: 'packaging',
    description: 'Small cardboard boxes for shipping',
    quantity: 200,
    unit: 'piece',
    cost: 0.75,
    price: 1.25,
    reorderLevel: 50,
    status: 'active'
  },
  {
    id: '3',
    name: 'Raw Pulp',
    sku: 'RP-100',
    category: 'raw',
    description: 'Raw paper pulp for manufacturing',
    quantity: 1000,
    unit: 'kg',
    cost: 2.00,
    price: 0,
    reorderLevel: 200,
    status: 'active'
  },
];

export async function getProducts(filter?: { category?: 'all' | ProductCategory | 'low-stock'; search?: string }): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredProducts = [...mockProducts];

  if (filter) {
    if (filter.category && filter.category !== 'all') {
      if (filter.category === 'low-stock') {
        filteredProducts = filteredProducts.filter(product => 
          product.quantity <= product.reorderLevel
        );
      } else {
        filteredProducts = filteredProducts.filter(product => 
          product.category === filter.category
        );
      }
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.sku.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }
  }

  return filteredProducts;
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const newProduct: Product = {
    ...product,
    id: Math.random().toString(36).substring(2, 9),
  };

  mockProducts.push(newProduct);
  return newProduct;
}

export async function updateProduct(product: Product): Promise<Product> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockProducts.findIndex(p => p.id === product.id);
  if (index >= 0) {
    mockProducts[index] = product;
    return product;
  }
  throw new Error('Product not found');
}

export async function deleteProduct(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockProducts.findIndex(p => p.id === id);
  if (index >= 0) {
    mockProducts.splice(index, 1);
    return;
  }
  throw new Error('Product not found');
}
