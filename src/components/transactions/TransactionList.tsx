import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownLeftIcon, ArrowUpRightIcon, SearchIcon } from 'lucide-react';
import { Transaction } from '../../services/transactionService';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../../components/ui/dialog';
import { TransactionDetails } from './TransactionDetails';
import { contentVariants } from '../../components/transitions/PageTransition';
import { cn } from '../../lib/utils';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
}

export function TransactionList({ 
  transactions, 
  isLoading = false,
  onEdit,
  onDelete
}: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-xs"
                  >
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <TransactionDetails 
                    transaction={transaction} 
                    onEdit={onEdit ? () => onEdit(transaction) : undefined}
                    onDelete={onDelete ? () => onDelete(transaction) : undefined}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
