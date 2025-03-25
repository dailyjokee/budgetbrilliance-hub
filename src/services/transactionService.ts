
import { toast } from "sonner";

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  name: string;
  description?: string;
  category: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  reference: string;
}

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: 'tr1',
    type: 'income',
    name: 'Client Payment - ABC Corp',
    category: 'Services',
    amount: 2500,
    date: '2023-04-14',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    reference: 'INV-001'
  },
  {
    id: 'tr2',
    type: 'expense',
    name: 'Office Supplies',
    category: 'Operations',
    amount: 149.99,
    date: '2023-04-13',
    status: 'completed',
    paymentMethod: 'Credit Card',
    reference: 'PO-113'
  },
  {
    id: 'tr3',
    type: 'expense',
    name: 'Cloud Services - AWS',
    category: 'Software',
    amount: 79.99,
    date: '2023-04-10',
    status: 'pending',
    paymentMethod: 'Credit Card',
    reference: 'AWS-Apr'
  },
  {
    id: 'tr4',
    type: 'income',
    name: 'Consulting Services - XYZ Inc',
    category: 'Services',
    amount: 1200,
    date: '2023-04-08',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    reference: 'INV-002'
  },
  {
    id: 'tr5',
    type: 'expense',
    name: 'Marketing Campaign',
    category: 'Advertising',
    amount: 350,
    date: '2023-04-05',
    status: 'failed',
    paymentMethod: 'Credit Card',
    reference: 'MKT-Q2'
  },
  {
    id: 'tr6',
    type: 'income',
    name: 'Product Sales',
    category: 'Sales',
    amount: 750,
    date: '2023-04-03',
    status: 'completed',
    paymentMethod: 'Cash',
    reference: 'SALE-0425'
  },
  {
    id: 'tr7',
    type: 'expense',
    name: 'Rent Payment',
    category: 'Rent',
    amount: 1800,
    date: '2023-04-01',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    reference: 'RENT-APR'
  },
  {
    id: 'tr8',
    type: 'expense',
    name: 'Utilities - Electricity',
    category: 'Utilities',
    amount: 120.50,
    date: '2023-03-28',
    status: 'completed',
    paymentMethod: 'Direct Debit',
    reference: 'UTIL-E-MAR'
  },
];

export const transactionService = {
  // Get all transactions
  getTransactions: (): Promise<Transaction[]> => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        resolve(mockTransactions);
      }, 500);
    });
  },

  // Get transaction by ID
  getTransactionById: (id: string): Promise<Transaction | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transaction = mockTransactions.find(t => t.id === id);
        resolve(transaction);
      }, 300);
    });
  },

  // Filter transactions
  filterTransactions: (
    filter: {
      type?: 'income' | 'expense' | 'all';
      search?: string;
      category?: string;
      status?: 'completed' | 'pending' | 'failed' | 'all';
    }
  ): Promise<Transaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockTransactions];
        
        if (filter.type && filter.type !== 'all') {
          filtered = filtered.filter(t => t.type === filter.type);
        }
        
        if (filter.search) {
          const searchLower = filter.search.toLowerCase();
          filtered = filtered.filter(t => 
            t.name.toLowerCase().includes(searchLower) ||
            t.category.toLowerCase().includes(searchLower) ||
            t.reference.toLowerCase().includes(searchLower)
          );
        }
        
        if (filter.category) {
          filtered = filtered.filter(t => t.category === filter.category);
        }
        
        if (filter.status && filter.status !== 'all') {
          filtered = filtered.filter(t => t.status === filter.status);
        }
        
        resolve(filtered);
      }, 500);
    });
  },

  // Create new transaction
  createTransaction: (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransaction = {
          ...transaction,
          id: `tr${Date.now()}`
        };
        
        toast.success('Transaction created successfully');
        resolve(newTransaction);
      }, 800);
    });
  },

  // Update transaction
  updateTransaction: (transaction: Transaction): Promise<Transaction> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success('Transaction updated successfully');
        resolve(transaction);
      }, 800);
    });
  },

  // Delete transaction
  deleteTransaction: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success('Transaction deleted successfully');
        resolve(true);
      }, 600);
    });
  }
};
