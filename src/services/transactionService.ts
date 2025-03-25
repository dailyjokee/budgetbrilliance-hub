
// Transaction types
export type TransactionStatus = 'completed' | 'pending' | 'failed';
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  description?: string;
  type: TransactionType;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  reference: string;
  status: TransactionStatus;
}

// Sample data
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Client Payment',
    description: 'Monthly retainer',
    type: 'income',
    amount: 2500,
    date: '2023-05-15',
    category: 'Services',
    paymentMethod: 'Bank Transfer',
    reference: 'INV-2023-001',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Office Rent',
    description: 'Monthly office space rent',
    type: 'expense',
    amount: 1200,
    date: '2023-05-01',
    category: 'Rent',
    paymentMethod: 'Direct Debit',
    reference: 'RENT-05-2023',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Software Subscription',
    description: 'Monthly design software subscription',
    type: 'expense',
    amount: 49.99,
    date: '2023-05-05',
    category: 'Software',
    paymentMethod: 'Credit Card',
    reference: 'SUB-123456',
    status: 'completed'
  },
  {
    id: '4',
    name: 'Product Sale',
    description: 'Sale of digital templates',
    type: 'income',
    amount: 359.95,
    date: '2023-05-18',
    category: 'Sales',
    paymentMethod: 'PayPal',
    reference: 'SALE-20230518',
    status: 'completed'
  },
  {
    id: '5',
    name: 'Pending Invoice',
    description: 'Consulting for Client XYZ',
    type: 'income',
    amount: 1500,
    date: '2023-05-25',
    category: 'Services',
    paymentMethod: 'Bank Transfer',
    reference: 'INV-2023-005',
    status: 'pending'
  }
];

// Service functions
export const getTransactions = async (): Promise<Transaction[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleTransactions), 500);
  });
};

export const getTransaction = async (id: string): Promise<Transaction | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleTransactions.find(t => t.id === id)), 500);
  });
};

export const createTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  // Simulate API call
  return new Promise((resolve) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 9)
    };
    
    setTimeout(() => resolve(newTransaction), 500);
  });
};

export const updateTransaction = async (transaction: Transaction): Promise<Transaction> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(transaction), 500);
  });
};

export const deleteTransaction = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};
