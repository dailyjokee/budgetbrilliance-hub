
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  name: string;
  description?: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  reference?: string;
  status: TransactionStatus;
}

// Filter parameters
interface FilterParams {
  type?: TransactionType;
  search?: string;
  status?: TransactionStatus;
}

// Mock data and functions
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    name: 'Sales Revenue',
    description: 'Monthly sales revenue',
    category: 'Sales',
    amount: 5000,
    date: '2025-04-01',
    paymentMethod: 'Bank Transfer',
    reference: 'INV-001',
    status: 'completed',
  },
  {
    id: '2',
    type: 'expense',
    name: 'Office Rent',
    description: 'Monthly office rent payment',
    category: 'Rent',
    amount: 1200,
    date: '2025-04-05',
    paymentMethod: 'Bank Transfer',
    reference: 'RENT-APR',
    status: 'completed',
  },
  {
    id: '3',
    type: 'expense',
    name: 'Software Subscription',
    description: 'Monthly subscription for accounting software',
    category: 'Software',
    amount: 50,
    date: '2025-04-10',
    paymentMethod: 'Credit Card',
    reference: 'SUB-123',
    status: 'pending',
  },
];

const filterTransactions = async (filters: FilterParams): Promise<Transaction[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredTransactions = [...mockTransactions];
      
      if (filters.type) {
        filteredTransactions = filteredTransactions.filter(t => t.type === filters.type);
      }
      
      if (filters.status) {
        filteredTransactions = filteredTransactions.filter(t => t.status === filters.status);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredTransactions = filteredTransactions.filter(t => 
          t.name.toLowerCase().includes(searchLower) || 
          t.description?.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
        );
      }
      
      resolve(filteredTransactions);
    }, 500);
  });
};

export const getTransactions = async (): Promise<Transaction[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTransactions), 500);
  });
};

export const getTransactionById = async (id: string): Promise<Transaction | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTransactions.find(transaction => transaction.id === id)), 500);
  });
};

export const createTransaction = async (transaction: Omit<Transaction, "id">): Promise<Transaction> => {
  // Simulate API call
  const newTransaction = {
    ...transaction,
    id: Date.now().toString(),
  };
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(newTransaction), 500);
  });
};

export const updateTransaction = async (transaction: Transaction): Promise<Transaction> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(transaction), 500);
  });
};

export const deleteTransaction = async (id: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
};

export const transactionService = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  filterTransactions,
};
