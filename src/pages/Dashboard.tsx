import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { CashFlowChart } from '@/components/dashboard/CashFlowChart';
import { 
  BanknoteIcon, 
  CreditCardIcon, 
  ArrowDownRightIcon, 
  ArrowUpRightIcon 
} from 'lucide-react';
import { Transaction } from '@/services/transactionService';

const Dashboard = () => {
  // Mock data for dashboard
  const mockStats = [
    { title: 'Total Revenue', value: '$24,345.00', change: 12, icon: <BanknoteIcon size={20} />, color: 'primary' },
    { title: 'Total Expenses', value: '$12,586.00', change: -2, icon: <CreditCardIcon size={20} />, color: 'danger' },
    { title: 'Net Income', value: '$11,759.00', change: 18, icon: <ArrowUpRightIcon size={20} />, color: 'success' },
    { title: 'Pending Invoices', value: '$3,450.00', change: 0, icon: <ArrowDownRightIcon size={20} />, color: 'warning' },
  ];
  
  // Updated mock transactions to include paymentMethod and reference properties
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      name: 'Client Payment',
      category: 'Services',
      amount: 2500,
      date: 'Today',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      reference: 'INV-001'
    },
    {
      id: '2',
      type: 'expense',
      name: 'Office Supplies',
      category: 'Operations',
      amount: 149.99,
      date: 'Yesterday',
      status: 'completed',
      paymentMethod: 'Credit Card',
      reference: 'PO-113'
    },
    {
      id: '3',
      type: 'expense',
      name: 'Cloud Services',
      category: 'Software',
      amount: 79.99,
      date: 'Apr 10, 2023',
      status: 'pending',
      paymentMethod: 'Credit Card',
      reference: 'AWS-Apr'
    },
    {
      id: '4',
      type: 'income',
      name: 'Consulting',
      category: 'Services',
      amount: 1200,
      date: 'Apr 8, 2023',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      reference: 'CONS-1234'
    },
    {
      id: '5',
      type: 'expense',
      name: 'Marketing',
      category: 'Advertising',
      amount: 350,
      date: 'Apr 5, 2023',
      status: 'failed',
      paymentMethod: 'Credit Card',
      reference: 'MKT-042'
    }
  ];
  
  const mockCashFlowData = [
    { name: 'Jan', income: 5000, expense: 4000 },
    { name: 'Feb', income: 6000, expense: 4500 },
    { name: 'Mar', income: 5500, expense: 5000 },
    { name: 'Apr', income: 7500, expense: 5500 },
    { name: 'May', income: 8000, expense: 6000 },
    { name: 'Jun', income: 9000, expense: 7000 },
    { name: 'Jul', income: 10000, expense: 6500 },
  ];

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <span className="text-sm text-muted-foreground">Last updated: April 14, 2023</span>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mockStats.map((stat, i) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color as any}
              />
            ))}
          </div>
          
          {/* Charts and Recent Transactions */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <CashFlowChart data={mockCashFlowData} className="lg:col-span-2" />
            <RecentTransactions transactions={mockTransactions} />
          </div>
          
          {/* Quick Actions */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <QuickAction 
              title="New Transaction" 
              description="Record a new financial transaction"
              icon={<CreditCardIcon className="w-5 h-5 text-primary" />}
              href="/transactions"
            />
            <QuickAction 
              title="New Contact" 
              description="Add a customer or supplier"
              icon={<svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>}
              href="/contacts"
            />
            <QuickAction 
              title="Financial Reports" 
              description="View recent financial statements"
              icon={<svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>}
              href="/reports"
            />
          </motion.div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const QuickAction = ({ title, description, icon, href }: QuickActionProps) => {
  return (
    <a 
      href={href}
      className="rounded-xl border bg-card p-4 shadow-subtle hover:border-primary/20 transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/10 p-2">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default Dashboard;
