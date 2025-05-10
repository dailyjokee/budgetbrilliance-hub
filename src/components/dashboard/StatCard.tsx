import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'default',
  className 
}: StatCardProps) {
  const colorStyles = {
    default: 'border-border',
    primary: 'border-primary/20',
    success: 'border-emerald-500/20',
    warning: 'border-amber-500/20',
    danger: 'border-rose-500/20'
  };
  
  const iconColorStyles = {
    default: 'bg-muted text-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-emerald-500/10 text-emerald-500',
    warning: 'bg-amber-500/10 text-amber-500',
    danger: 'bg-rose-500/10 text-rose-500'
  };
  
  const changeColor = change === 0 
    ? 'text-muted-foreground' 
    : change && change > 0 
      ? 'text-emerald-500' 
      : 'text-rose-500';

  const ChangeIcon = change === 0 
    ? Minus 
    : change && change > 0 
      ? ArrowUpRight 
      : ArrowDownRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl bg-card border p-5 shadow-subtle hover-lift",
        colorStyles[color],
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        
        {icon && (
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            iconColorStyles[color]
          )}>
            {icon}
          </div>
        )}
      </div>
      
      {typeof change !== 'undefined' && (
        <div className={cn("flex items-center mt-3 text-sm gap-1", changeColor)}>
          <ChangeIcon size={16} />
          <span className="font-medium">{Math.abs(change)}%</span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      )}
    </motion.div>
  );
}
