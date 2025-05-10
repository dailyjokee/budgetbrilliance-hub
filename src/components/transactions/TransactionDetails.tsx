import React from 'react';
import { format } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight, CalendarIcon, ClockIcon } from 'lucide-react';
import { Transaction } from '../../services/transactionService';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '../ui/dialog';
import { cn } from '../../lib/utils';

interface TransactionDetailsProps {
  transaction: Transaction;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TransactionDetails({ transaction, onEdit, onDelete }: TransactionDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
          transaction.type === 'income' 
            ? 'bg-emerald-500/10 text-emerald-500' 
            : 'bg-rose-500/10 text-rose-500'
        )}>
          {transaction.type === 'income' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold">{transaction.name}</h3>
          <p className="text-sm text-muted-foreground">{transaction.category}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
        <div>
          <p className="text-sm text-muted-foreground">Amount</p>
          <p className={cn(
            "text-2xl font-bold",
            transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
          )}>
            {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Date</p>
            <div className="flex items-center gap-1 justify-end">
              <CalendarIcon size={14} />
              <p>{transaction.date}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="flex items-center justify-end">
              <span className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs",
                transaction.status === 'completed' 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : transaction.status === 'pending' 
                    ? 'bg-amber-500/10 text-amber-500' 
                    : 'bg-rose-500/10 text-rose-500'
              )}>
                <span className={cn(
                  "mr-1 w-1.5 h-1.5 rounded-full",
                  transaction.status === 'completed' 
                    ? 'bg-emerald-500' 
                    : transaction.status === 'pending' 
                      ? 'bg-amber-500' 
                      : 'bg-rose-500'
                )} />
                {transaction.status}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Payment Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Method</span>
              <span className="text-sm font-medium">{transaction.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Reference</span>
              <span className="text-sm font-medium">{transaction.reference}</span>
            </div>
          </div>
        </div>
        
        {transaction.description && (
          <div>
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm">{transaction.description}</p>
          </div>
        )}
      </div>
      
      {(onEdit || onDelete) && (
        <div className="flex justify-end space-x-2 pt-4 border-t">
          {onDelete && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete this transaction?</DialogTitle>
                </DialogHeader>
                <p className="py-4">This action cannot be undone. This will permanently delete the transaction from your account.</p>
                <div className="flex justify-end space-x-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={onDelete}>
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          {onEdit && (
            <Button onClick={onEdit}>Edit</Button>
          )}
        </div>
      )}
    </div>
  );
}
