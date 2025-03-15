
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon, FilterIcon, ArrowDownUpIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InvoiceList } from '@/components/sales/InvoiceList';
import { InvoiceForm } from '@/components/sales/InvoiceForm';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const Sales = () => {
  // This is a placeholder until we implement the full Sales context
  const [filter, setFilter] = useState({ status: 'all', search: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState<any[]>([
    {
      id: '1',
      number: 'INV-001',
      customer: 'John Doe',
      date: '2023-05-15',
      amount: 1250.99,
      status: 'paid',
    },
    {
      id: '2',
      number: 'INV-002',
      customer: 'Jane Smith',
      date: '2023-05-20',
      amount: 2500.50,
      status: 'pending',
    },
    {
      id: '3',
      number: 'INV-003',
      customer: 'Acme Corp',
      date: '2023-05-25',
      amount: 4750.75,
      status: 'overdue',
    },
  ]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | undefined>(undefined);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: e.target.value });
  };
  
  const handleTabChange = (value: string) => {
    setFilter({ ...filter, status: value });
  };
  
  const handleCreateInvoice = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newInvoice = {
        id: Date.now().toString(),
        number: `INV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        customer: data.customer,
        date: new Date().toISOString().split('T')[0],
        amount: data.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0),
        status: 'pending',
        ...data,
      };
      
      setInvoices([newInvoice, ...invoices]);
      setIsFormOpen(false);
      toast.success('Invoice created successfully');
    } catch (error) {
      console.error('Error creating invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsFormOpen(true);
  };
  
  const handleUpdateInvoice = async (data: any) => {
    if (!selectedInvoice) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedInvoice = {
        ...selectedInvoice,
        ...data,
        amount: data.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0),
      };
      
      setInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
      setIsFormOpen(false);
      setSelectedInvoice(undefined);
      toast.success('Invoice updated successfully');
    } catch (error) {
      console.error('Error updating invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteInvoice = async (invoice: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setInvoices(invoices.filter(inv => inv.id !== invoice.id));
      toast.success('Invoice deleted successfully');
    } catch (error) {
      console.error('Error deleting invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Sales</h1>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  className="pl-8"
                  value={filter.search}
                  onChange={handleSearch}
                />
              </div>
              
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <ArrowDownUpIcon className="h-4 w-4" />
              </Button>
              
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedInvoice(undefined)}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedInvoice ? 'Edit Invoice' : 'Create Invoice'}
                    </DialogTitle>
                  </DialogHeader>
                  <InvoiceForm
                    invoice={selectedInvoice}
                    onSubmit={selectedInvoice ? handleUpdateInvoice : handleCreateInvoice}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setSelectedInvoice(undefined);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={filter.status} onValueChange={handleTabChange}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All Invoices</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <InvoiceList 
                invoices={invoices} 
                isLoading={isLoading}
                onEdit={handleEditInvoice}
                onDelete={handleDeleteInvoice}
              />
            </TabsContent>
            <TabsContent value="paid" className="mt-6">
              <InvoiceList 
                invoices={invoices.filter(inv => inv.status === 'paid')} 
                isLoading={isLoading}
                onEdit={handleEditInvoice}
                onDelete={handleDeleteInvoice}
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-6">
              <InvoiceList 
                invoices={invoices.filter(inv => inv.status === 'pending')} 
                isLoading={isLoading}
                onEdit={handleEditInvoice}
                onDelete={handleDeleteInvoice}
              />
            </TabsContent>
            <TabsContent value="overdue" className="mt-6">
              <InvoiceList 
                invoices={invoices.filter(inv => inv.status === 'overdue')} 
                isLoading={isLoading}
                onEdit={handleEditInvoice}
                onDelete={handleDeleteInvoice}
              />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Sales;
