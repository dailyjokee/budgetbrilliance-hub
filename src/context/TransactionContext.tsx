
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, filterTransactions } from '../services/transactionService';

// Define the context type
interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  filter: { 
    type: "income" | "expense" | "all"; 
    search: string; 
    status: "completed" | "pending" | "failed" | "all" 
  };
  setFilter: (filter: Partial<{ 
    type: "income" | "expense" | "all"; 
    search: string; 
    status: "completed" | "pending" | "failed" | "all" 
  }>) => void;
  refreshTransactions: () => Promise<void>;
  createTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

// Create the context
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Mock data for initial state
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    name: 'Client Payment',
    category: 'Services',
    amount: 2500,
    date: '2023-05-15',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    reference: 'INV-001'
  },
  {
    id: '2',
    type: 'expense',
    name: 'Office Supplies',
    category: 'Operations',
    amount: 149.99,
    date: '2023-05-13',
    status: 'completed',
    paymentMethod: 'Credit Card',
    reference: 'PO-113'
  },
  {
    id: '3',
    type: 'expense',
    name: 'Software License',
    category: 'Software',
    amount: 79.99,
    date: '2023-05-10',
    status: 'pending',
    paymentMethod: 'Credit Card',
    reference: 'LIC-456'
  },
  {
    id: '4',
    type: 'income',
    name: 'Consulting',
    category: 'Services',
    amount: 1200,
    date: '2023-05-08',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    reference: 'CONS-1234'
  },
];

// Provider component
export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<TransactionContextType['filter']>({
    type: 'all',
    search: '',
    status: 'all'
  });

  // Update the filter state
  const updateFilter = (newFilter: Partial<typeof filter>) => {
    setFilter(prev => ({
      ...prev,
      ...newFilter
    }));
  };

  // Refresh transactions
  const refreshTransactions = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a delay and return the mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      setTransactions(mockTransactions);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new transaction
  const createTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
      };
      setTransactions([newTransaction, ...transactions]);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update a transaction
  const updateTransaction = async (transaction: Transaction) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setTransactions(
        transactions.map(t => (t.id === transaction.id ? transaction : t))
      );
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setTransactions(transactions.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter transactions based on the current filter
  const filteredTransactions = filterTransactions(transactions, filter);

  // Context value
  const value = {
    transactions: filteredTransactions,
    isLoading,
    error,
    filter,
    setFilter: updateFilter,
    refreshTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// Hook for using the transaction context
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
