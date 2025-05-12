
import React from 'react';
import { motion } from 'framer-motion';
import { contentVariants } from '@/components/transitions/PageTransition';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { cn } from '@/lib/utils';

interface CashFlowData {
  name: string;
  income: number;
  expense: number;
}

interface CashFlowChartProps {
  data: CashFlowData[];
  className?: string;
}

export function CashFlowChart({ data, className }: CashFlowChartProps) {
  return (
    <motion.div 
      className={cn("rounded-xl border bg-card p-5 shadow-subtle", className)}
      variants={contentVariants(0.2)}
      initial="initial"
      animate="animate"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold">Cash Flow</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2" />
            <span className="text-sm text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-rose-500 mr-2" />
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-popover border shadow-md rounded-lg p-3 text-sm">
                      <p className="font-medium mb-1">{label}</p>
                      <p className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                        Income: <span className="font-medium ml-1">${payload[0].value}</span>
                      </p>
                      <p className="flex items-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500 mr-2" />
                        Expenses: <span className="font-medium ml-1">${payload[1].value}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="hsl(0, 84%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
