
import React, { useState } from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import DashboardLayout from '../layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  FilterIcon, 
  PlusIcon, 
  SearchIcon 
} from 'lucide-react';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { Transaction } from '../services/transactionService';
import { useTransactions } from '../context/TransactionContext';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogTrigger 
} from '../components/ui/dialog';
import { toast } from 'sonner';

const Transactions = () => {
  const { 
    transactions, 
    isLoading, 
    filter, 
    setFilter, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction 
  } = useTransactions();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ search: e.target.value });
  };
  
  const handleTabChange = (value: string) => {
    setFilter({ 
      type: value === 'all' 
        ? 'all' 
        : value === 'income' 
          ? 'income' 
          : 'expense' 
    });
  };
  
  const handleCreateTransaction = async (data: any) => {
    try {
      await createTransaction({
        ...data,
        date: data.date.toISOString().split('T')[0],
        status: 'completed', // Default status for new transactions
      });
      setIsFormOpen(false);
      toast.success('Transaction created successfully');
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsFormOpen(true);
  };
  
  const handleUpdateTransaction = async (data: any) => {
    if (!selectedTransaction) return;
    
    try {
      await updateTransaction({
        ...selectedTransaction,
        ...data,
        date: data.date.toISOString().split('T')[0],
      });
      setIsFormOpen(false);
      setSelectedTransaction(undefined);
      toast.success('Transaction updated successfully');
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };
  
  const handleDeleteTransaction = async (transaction: Transaction) => {
    try {
      await deleteTransaction(transaction.id);
      toast.success('Transaction deleted successfully');
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  
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
                  value={filter.search}
                  onChange={handleSearch}
                />
              </div>
              
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
              
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedTransaction(undefined)}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedTransaction ? 'Edit Transaction' : 'Create Transaction'}
                    </DialogTitle>
                  </DialogHeader>
                  <TransactionForm
                    transaction={selectedTransaction}
                    onSubmit={selectedTransaction ? handleUpdateTransaction : handleCreateTransaction}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setSelectedTransaction(undefined);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={filter.type} onValueChange={handleTabChange}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expenses</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <TransactionList 
                transactions={transactions} 
                isLoading={isLoading}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </TabsContent>
            <TabsContent value="income" className="mt-6">
              <TransactionList 
                transactions={transactions} 
                isLoading={isLoading}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </TabsContent>
            <TabsContent value="expense" className="mt-6">
              <TransactionList 
                transactions={transactions} 
                isLoading={isLoading}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Transactions;
