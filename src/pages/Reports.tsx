
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText, Download, Printer, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { contentVariants } from '@/components/transitions/PageTransition';
import { toast } from 'sonner';

const Reports = () => {
  const [periodTab, setPeriodTab] = useState('thisMonth');
  
  const reportTypes = [
    {
      id: 'profit-loss',
      title: 'Profit & Loss',
      description: 'Summary of revenues, costs, and expenses',
      icon: <BarChart3 className="h-8 w-8 text-primary/70" />
    },
    {
      id: 'balance-sheet',
      title: 'Balance Sheet',
      description: 'Assets, liabilities and equity snapshot',
      icon: <svg className="h-8 w-8 text-primary/70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    },
    {
      id: 'cash-flow',
      title: 'Cash Flow',
      description: 'Money movement in and out of your business',
      icon: <svg className="h-8 w-8 text-primary/70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20"/>
        <path d="M5 20V8.2a1 1 0 0 1 .4-.8l10.5-7.2a1 1 0 0 1 1.1 0l4.9 3.3a1 1 0 0 1 0 1.7l-10.5 7.2a1 1 0 0 1-1 0l-5.1-3.5"/>
      </svg>
    },
    {
      id: 'tax-summary',
      title: 'Tax Summary',
      description: 'Sales tax collected and paid',
      icon: <FileText className="h-8 w-8 text-primary/70" />
    },
    {
      id: 'expense-report',
      title: 'Expense Report',
      description: 'Detailed breakdown of all expenses',
      icon: <svg className="h-8 w-8 text-primary/70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
        <path d="M16 3v10"/>
      </svg>
    },
    {
      id: 'accounts-aging',
      title: 'Accounts Aging',
      description: 'Monitor overdue receivables and payables',
      icon: <Calendar className="h-8 w-8 text-primary/70" />
    },
  ];
  
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Financial Reports</h1>
            
            <div className="flex items-center gap-2">
              <Tabs 
                value={periodTab} 
                onValueChange={setPeriodTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="thisMonth">This Month</TabsTrigger>
                  <TabsTrigger value="lastMonth">Last Month</TabsTrigger>
                  <TabsTrigger value="quarter">Quarter</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={contentVariants(0.1)}
            initial="initial"
            animate="animate"
          >
            {reportTypes.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.05 * index }
                }}
              >
                <Card className="hover:border-primary/30 transition-colors cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3">
                      {report.icon}
                    </div>
                    <div className="space-y-1">
                      <CardTitle>{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toast.info(`View ${report.title} report`)}
                      >
                        View
                      </Button>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toast.info(`Download ${report.title} report`)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toast.info(`Print ${report.title} report`)}
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Reports;
