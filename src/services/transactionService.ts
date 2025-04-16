
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
  paymentMethod: string;
  status: TransactionStatus;
  reference?: string;
  notes?: string;
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    description: 'Invoice payment',
    category: 'Sales',
    date: '2023-05-05',
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    reference: 'INV-2023-001'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    description: 'Office rent',
    category: 'Rent',
    date: '2023-05-01',
    paymentMethod: 'Bank Transfer',
    status: 'completed',
  },
  {
    id: '3',
    type: 'expense',
    amount: 350,
    description: 'Office supplies',
    category: 'Supplies',
    date: '2023-05-03',
    paymentMethod: 'Credit Card',
    status: 'completed',
  },
  {
    id: '4',
    type: 'income',
    amount: 3500,
    description: 'Consulting services',
    category: 'Services',
    date: '2023-05-10',
    paymentMethod: 'Bank Transfer',
    status: 'pending',
    reference: 'SRV-2023-042'
  },
];

export const getTransactionsByTimeframe = async (timeframe: 'day' | 'week' | 'month' | 'year'): Promise<Transaction[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const now = new Date();
  let startDate = new Date();
  
  switch (timeframe) {
    case 'day':
      startDate.setDate(now.getDate() - 1);
      break;
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  return mockTransactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= now;
  });
};

export const getRecentTransactions = async (limit = 5): Promise<Transaction[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Sort by date (newest first) and limit
  return [...mockTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export async function getTransactions(filter?: { 
  type?: 'all' | TransactionType; 
  status?: 'all' | TransactionStatus;
  search?: string;
}): Promise<Transaction[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredTransactions = [...mockTransactions];

  if (filter) {
    if (filter.type && filter.type !== 'all') {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.type === filter.type
      );
    }

    if (filter.status && filter.status !== 'all') {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.status === filter.status
      );
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredTransactions = filteredTransactions.filter(transaction => 
        transaction.description.toLowerCase().includes(searchLower) || 
        transaction.category.toLowerCase().includes(searchLower) ||
        (transaction.reference && transaction.reference.toLowerCase().includes(searchLower))
      );
    }
  }

  return filteredTransactions;
}

export async function createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const newTransaction: Transaction = {
    ...transaction,
    id: Math.random().toString(36).substring(2, 9),
  };

  mockTransactions.push(newTransaction);
  return newTransaction;
}

export async function updateTransaction(transaction: Transaction): Promise<Transaction> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockTransactions.findIndex(t => t.id === transaction.id);
  if (index >= 0) {
    mockTransactions[index] = transaction;
    return transaction;
  }
  throw new Error('Transaction not found');
}

export async function deleteTransaction(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockTransactions.findIndex(t => t.id === id);
  if (index >= 0) {
    mockTransactions.splice(index, 1);
    return;
  }
  throw new Error('Transaction not found');
}

export const getIncomeExpenseSummary = async (timeframe: 'week' | 'month' | 'year'): Promise<{
  income: number;
  expense: number;
  balance: number;
}> => {
  const transactions = await getTransactionsByTimeframe(timeframe);
  
  const income = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expense = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
    
  return {
    income,
    expense,
    balance: income - expense
  };
};

export const getCashFlowData = async (timeframe: 'week' | 'month' | 'year'): Promise<{
  labels: string[];
  income: number[];
  expense: number[];
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let labels: string[] = [];
  let format: string;
  let periods: number;
  
  const now = new Date();
  
  switch (timeframe) {
    case 'week':
      format = 'day';
      periods = 7;
      // Generate last 7 days
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
      }
      break;
    case 'month':
      format = 'week';
      periods = 4;
      // Generate last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - (i * 7));
        labels.push(`Week ${4-i}`);
      }
      break;
    case 'year':
      format = 'month';
      periods = 12;
      // Generate last 12 months
      for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setMonth(now.getMonth() - i);
        labels.push(d.toLocaleDateString('en-US', { month: 'short' }));
      }
      break;
  }
  
  // Mock data for income and expense
  const income = Array.from({ length: periods }, () => Math.floor(Math.random() * 5000) + 1000);
  const expense = Array.from({ length: periods }, () => Math.floor(Math.random() * 3000) + 500);
  
  return { labels, income, expense };
};
