
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, transactionService } from '../services/transactionService';
import { toast } from 'sonner';

interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  filter: {
    type: 'all' | 'income' | 'expense';
    search: string;
    status: 'all' | 'completed' | 'pending' | 'failed';
  };
  setFilter: (filter: Partial<TransactionContextType['filter']>) => void;
  refreshTransactions: () => Promise<void>;
  createTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<Transaction>;
  updateTransaction: (transaction: Transaction) => Promise<Transaction>;
  deleteTransaction: (id: string) => Promise<boolean>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilterState] = useState({
    type: 'all' as const,
    search: '',
    status: 'all' as const
  });

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const filteredTransactions = await transactionService.filterTransactions({
        type: filter.type === 'all' ? undefined : filter.type,
        search: filter.search || undefined,
        status: filter.status === 'all' ? undefined : filter.status
      });
      setTransactions(filteredTransactions);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load transactions'));
      toast.error('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [filter]);

  const setFilter = (newFilter: Partial<TransactionContextType['filter']>) => {
    setFilterState(prev => ({ ...prev, ...newFilter }));
  };

  const refreshTransactions = async () => {
    await loadTransactions();
  };

  const createTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction = await transactionService.createTransaction(transaction);
      await refreshTransactions();
      return newTransaction;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create transaction'));
      toast.error('Failed to create transaction');
      throw err;
    }
  };

  const updateTransaction = async (transaction: Transaction) => {
    try {
      const updatedTransaction = await transactionService.updateTransaction(transaction);
      await refreshTransactions();
      return updatedTransaction;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update transaction'));
      toast.error('Failed to update transaction');
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const success = await transactionService.deleteTransaction(id);
      if (success) {
        await refreshTransactions();
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete transaction'));
      toast.error('Failed to delete transaction');
      throw err;
    }
  };

  const contextValue: TransactionContextType = {
    transactions,
    isLoading,
    error,
    filter,
    setFilter,
    refreshTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
  };

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
