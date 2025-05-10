
export type ProductCategory = 'electronics' | 'clothing' | 'food' | 'other';

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: ProductCategory;
  price: number;
  cost: number;
  quantity: number;
  lowStockThreshold: number;
  sku: string;
  barcode?: string;
  image?: string;
  lastRestocked?: string;
}

interface ProductFilter {
  category?: 'all' | ProductCategory | 'low-stock';
  search?: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone XYZ',
    description: 'Latest model with advanced features',
    category: 'electronics',
    price: 799.99,
    cost: 500,
    quantity: 25,
    lowStockThreshold: 10,
    sku: 'PHONE-001',
    barcode: '123456789012',
    lastRestocked: '2025-03-15'
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton',
    category: 'clothing',
    price: 19.99,
    cost: 8,
    quantity: 100,
    lowStockThreshold: 20,
    sku: 'TSHIRT-001'
  },
  {
    id: '3',
    name: 'Organic Pasta',
    description: 'Premium quality pasta',
    category: 'food',
    price: 5.99,
    cost: 2.5,
    quantity: 8,
    lowStockThreshold: 15,
    sku: 'PASTA-001',
    barcode: '987654321098',
    lastRestocked: '2025-04-01'
  }
];

export const getProducts = async (filter?: ProductFilter): Promise<Product[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProducts = [...mockProducts];
      
      if (filter?.category) {
        if (filter.category === 'low-stock') {
          filteredProducts = filteredProducts.filter(product => 
            product.quantity <= product.lowStockThreshold
          );
        } else if (filter.category !== 'all') {
          filteredProducts = filteredProducts.filter(product => 
            product.category === filter.category
          );
        }
      }
      
      if (filter?.search) {
        const searchLower = filter.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description?.toLowerCase().includes(searchLower) || 
          product.sku.toLowerCase().includes(searchLower)
        );
      }
      
      resolve(filteredProducts);
    }, 500);
  });
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
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
