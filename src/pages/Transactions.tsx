import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowDownLeftIcon, 
  ArrowUpRightIcon, 
  FilterIcon, 
  PlusIcon, 
  SearchIcon 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { contentVariants } from '@/components/transitions/PageTransition';
import { toast } from 'sonner';

// Mock transaction data with proper type annotations
const mockTransactions = [
  {
    id: 'tr1',
    type: 'income' as const,
    name: 'Client Payment - ABC Corp',
    category: 'Services',
    amount: 2500,
    date: '2023-04-14',
    status: 'completed' as const,
    paymentMethod: 'Bank Transfer',
    reference: 'INV-001'
  },
  {
    id: 'tr2',
    type: 'expense' as const,
    name: 'Office Supplies',
    category: 'Operations',
    amount: 149.99,
    date: '2023-04-13',
    status: 'completed' as const,
    paymentMethod: 'Credit Card',
    reference: 'PO-113'
  },
  {
    id: 'tr3',
    type: 'expense' as const,
    name: 'Cloud Services - AWS',
    category: 'Software',
    amount: 79.99,
    date: '2023-04-10',
    status: 'pending' as const,
    paymentMethod: 'Credit Card',
    reference: 'AWS-Apr'
  },
  {
    id: 'tr4',
    type: 'income' as const,
    name: 'Consulting Services - XYZ Inc',
    category: 'Services',
    amount: 1200,
    date: '2023-04-08',
    status: 'completed' as const,
    paymentMethod: 'Bank Transfer',
    reference: 'INV-002'
  },
  {
    id: 'tr5',
    type: 'expense' as const,
    name: 'Marketing Campaign',
    category: 'Advertising',
    amount: 350,
    date: '2023-04-05',
    status: 'failed' as const,
    paymentMethod: 'Credit Card',
    reference: 'MKT-Q2'
  },
  {
    id: 'tr6',
    type: 'income' as const,
    name: 'Product Sales',
    category: 'Sales',
    amount: 750,
    date: '2023-04-03',
    status: 'completed' as const,
    paymentMethod: 'Cash',
    reference: 'SALE-0425'
  },
  {
    id: 'tr7',
    type: 'expense' as const,
    name: 'Rent Payment',
    category: 'Rent',
    amount: 1800,
    date: '2023-04-01',
    status: 'completed' as const,
    paymentMethod: 'Bank Transfer',
    reference: 'RENT-APR'
  },
  {
    id: 'tr8',
    type: 'expense' as const,
    name: 'Utilities - Electricity',
    category: 'Utilities',
    amount: 120.50,
    date: '2023-03-28',
    status: 'completed' as const,
    paymentMethod: 'Direct Debit',
    reference: 'UTIL-E-MAR'
  },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'income' && transaction.type === 'income') || 
      (activeTab === 'expenses' && transaction.type === 'expense');
    
    return matchesSearch && matchesTab;
  });
  
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
              
              <Button onClick={() => toast.info('New transaction modal would open here')}>
                <PlusIcon className="h-4 w-4 mr-2" />
                New
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <TransactionList transactions={filteredTransactions} />
            </TabsContent>
            <TabsContent value="income" className="mt-6">
              <TransactionList transactions={filteredTransactions} />
            </TabsContent>
            <TabsContent value="expenses" className="mt-6">
              <TransactionList transactions={filteredTransactions} />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  name: string;
  category: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  reference: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-muted p-3 mb-4">
          <SearchIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No transactions found</h3>
        <p className="text-muted-foreground text-center mt-1 max-w-md">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="rounded-lg border overflow-hidden"
      variants={contentVariants(0.1)}
      initial="initial"
      animate="animate"
    >
      {/* Table header */}
      <div className="grid grid-cols-[auto_1fr_auto_auto] md:grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 p-4 bg-muted text-sm font-medium">
        <div className="hidden md:block">Type</div>
        <div>Description</div>
        <div>Amount</div>
        <div className="hidden md:block">Date</div>
        <div className="hidden md:block">Status</div>
        <div className="text-right">Actions</div>
      </div>
      
      {/* Table rows */}
      <div className="divide-y">
        {transactions.map((transaction, index) => (
          <motion.div 
            key={transaction.id}
            className="grid grid-cols-[auto_1fr_auto_auto] md:grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 p-4 items-center hover:bg-muted/50 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.03 * index }
            }}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
          >
            {/* Type */}
            <div className="hidden md:flex items-center justify-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                transaction.type === 'income' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'bg-rose-500/10 text-rose-500'
              }`}>
                {transaction.type === 'income' ? <ArrowDownLeftIcon size={16} /> : <ArrowUpRightIcon size={16} />}
              </div>
            </div>
            
            {/* Description */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center md:hidden mb-1">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                  transaction.type === 'income' 
                    ? 'bg-emerald-500/10 text-emerald-500' 
                    : 'bg-rose-500/10 text-rose-500'
                }`}>
                  {transaction.type === 'income' ? <ArrowDownLeftIcon size={12} /> : <ArrowUpRightIcon size={12} />}
                </div>
                <span className="text-xs text-muted-foreground">{transaction.date}</span>
              </div>
              
              <span className="font-medium truncate">{transaction.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{transaction.category}</span>
                <span className="text-xs text-muted-foreground hidden md:inline">• {transaction.paymentMethod}</span>
                <span className="text-xs text-muted-foreground hidden md:inline">• {transaction.reference}</span>
              </div>
            </div>
            
            {/* Amount */}
            <div className={`font-medium ${
              transaction.type === 'income' 
                ? 'text-emerald-500' 
                : 'text-rose-500'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </div>
            
            {/* Date */}
            <div className="hidden md:block text-sm">{transaction.date}</div>
            
            {/* Status */}
            <div className="hidden md:block">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                transaction.status === 'completed' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : transaction.status === 'pending' 
                    ? 'bg-amber-500/10 text-amber-500' 
                    : 'bg-rose-500/10 text-rose-500'
              }`}>
                <span className={`mr-1 w-1.5 h-1.5 rounded-full ${
                  transaction.status === 'completed' 
                    ? 'bg-emerald-500' 
                    : transaction.status === 'pending' 
                      ? 'bg-amber-500' 
                      : 'bg-rose-500'
                }`} />
                {transaction.status}
              </span>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs"
                onClick={() => toast.info(`View transaction ${transaction.id}`)}
              >
                View
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Transactions;
