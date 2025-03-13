
import React from 'react';
import { motion } from 'framer-motion';
import { contentVariants } from '@/components/transitions/PageTransition';
import { ArrowUpRight, ArrowDownLeft, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  name: string;
  description?: string;
  category: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  className?: string;
}

export function RecentTransactions({ transactions, className }: RecentTransactionsProps) {
  return (
    <motion.div 
      className={cn("rounded-xl border bg-card shadow-subtle overflow-hidden", className)}
      variants={contentVariants(0.1)}
      initial="initial"
      animate="animate"
    >
      <div className="flex items-center justify-between p-5 border-b">
        <h2 className="font-semibold">Recent Transactions</h2>
        <a href="/transactions" className="text-sm text-primary font-medium hover:underline">
          View all
        </a>
      </div>
      
      <div className="divide-y">
        {transactions.map((transaction, index) => (
          <motion.div 
            key={transaction.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.05 * index }
            }}
            className="p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                transaction.type === 'income' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'bg-rose-500/10 text-rose-500'
              )}>
                {transaction.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
              </div>
              
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium truncate">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  </div>
                  <p className={cn(
                    "font-medium",
                    transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar size={12} className="mr-1" />
                    <span>{transaction.date}</span>
                  </div>
                  <div className="flex items-center text-xs ml-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full mr-1",
                      transaction.status === 'completed' && 'bg-emerald-500',
                      transaction.status === 'pending' && 'bg-amber-500',
                      transaction.status === 'failed' && 'bg-rose-500'
                    )} />
                    <span className="capitalize">{transaction.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
