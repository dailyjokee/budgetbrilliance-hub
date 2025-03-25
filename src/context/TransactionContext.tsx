
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Transaction, TransactionType, TransactionStatus, getTransactions, createTransaction as apiCreateTransaction, updateTransaction as apiUpdateTransaction, deleteTransaction as apiDeleteTransaction } from '../services/transactionService';

// Filter type
interface TransactionFilter {
  type: 'all' | TransactionType;
  search: string;
  status: 'all' | TransactionStatus;
}

// Context type
interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  filter: TransactionFilter;
  setFilter: (filter: Partial<TransactionFilter>) => void;
  refreshTransactions: () => Promise<void>;
  createTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

// Create context
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Provider component
export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<TransactionFilter>({
    type: 'all',
    search: '',
    status: 'all'
  });

  const refreshTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilteredTransactions = () => {
    let result = [...transactions];
    
    // Filter by type
    if (filter.type !== 'all') {
      result = result.filter(t => t.type === filter.type);
    }
    
    // Filter by status
    if (filter.status !== 'all') {
      result = result.filter(t => t.status === filter.status);
    }
    
    // Filter by search term
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(searchTerm) ||
        t.category.toLowerCase().includes(searchTerm) ||
        t.reference.toLowerCase().includes(searchTerm) ||
        (t.description && t.description.toLowerCase().includes(searchTerm))
      );
    }
    
    setFilteredTransactions(result);
  };

  const handleSetFilter = (newFilter: Partial<TransactionFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const createTransaction = async (transaction: Omit<Transaction, "id">) => {
    setIsLoading(true);
    try {
      const newTransaction = await apiCreateTransaction(transaction);
      setTransactions(prev => [newTransaction, ...prev]);
      toast.success('Transaction created successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to create transaction');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTransaction = async (transaction: Transaction) => {
    setIsLoading(true);
    try {
      const updatedTransaction = await apiUpdateTransaction(transaction);
      setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
      toast.success('Transaction updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to update transaction');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransaction = async (id: string) => {
    setIsLoading(true);
    try {
      await apiDeleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      toast.success('Transaction deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to delete transaction');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    refreshTransactions();
  }, []);

  // Update filtered transactions when filters or transactions change
  useEffect(() => {
    updateFilteredTransactions();
  }, [filter, transactions]);

  const value = {
    transactions: filteredTransactions,
    isLoading,
    error,
    filter,
    setFilter: handleSetFilter,
    refreshTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

// Hook for using the context
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
