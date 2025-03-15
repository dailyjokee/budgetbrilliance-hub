
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon, FilterIcon, ArrowDownUpIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PurchaseOrderList } from '@/components/purchase/PurchaseOrderList';
import { PurchaseOrderForm } from '@/components/purchase/PurchaseOrderForm';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const Purchase = () => {
  // This is a placeholder until we implement the full Purchase context
  const [filter, setFilter] = useState({ status: 'all', search: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([
    {
      id: '1',
      number: 'PO-001',
      supplier: 'Acme Supplies',
      date: '2023-05-15',
      amount: 3250.99,
      status: 'received',
    },
    {
      id: '2',
      number: 'PO-002',
      supplier: 'Global Materials',
      date: '2023-05-20',
      amount: 1500.50,
      status: 'pending',
    },
    {
      id: '3',
      number: 'PO-003',
      supplier: 'Tech Distributors',
      date: '2023-05-25',
      amount: 750.75,
      status: 'ordered',
    },
  ]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<any | undefined>(undefined);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: e.target.value });
  };
  
  const handleTabChange = (value: string) => {
    setFilter({ ...filter, status: value });
  };
  
  const handleCreatePO = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPO = {
        id: Date.now().toString(),
        number: `PO-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        supplier: data.supplier,
        date: new Date().toISOString().split('T')[0],
        amount: data.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0),
        status: 'pending',
        ...data,
      };
      
      setPurchaseOrders([newPO, ...purchaseOrders]);
      setIsFormOpen(false);
      toast.success('Purchase order created successfully');
    } catch (error) {
      console.error('Error creating purchase order:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditPO = (po: any) => {
    setSelectedPO(po);
    setIsFormOpen(true);
  };
  
  const handleUpdatePO = async (data: any) => {
    if (!selectedPO) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedPO = {
        ...selectedPO,
        ...data,
        amount: data.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0),
      };
      
      setPurchaseOrders(purchaseOrders.map(po => po.id === updatedPO.id ? updatedPO : po));
      setIsFormOpen(false);
      setSelectedPO(undefined);
      toast.success('Purchase order updated successfully');
    } catch (error) {
      console.error('Error updating purchase order:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeletePO = async (po: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPurchaseOrders(purchaseOrders.filter(p => p.id !== po.id));
      toast.success('Purchase order deleted successfully');
    } catch (error) {
      console.error('Error deleting purchase order:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Purchase Orders</h1>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search purchase orders..."
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
                  <Button onClick={() => setSelectedPO(undefined)}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedPO ? 'Edit Purchase Order' : 'Create Purchase Order'}
                    </DialogTitle>
                  </DialogHeader>
                  <PurchaseOrderForm
                    purchaseOrder={selectedPO}
                    onSubmit={selectedPO ? handleUpdatePO : handleCreatePO}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setSelectedPO(undefined);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={filter.status} onValueChange={handleTabChange}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="ordered">Ordered</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <PurchaseOrderList 
                purchaseOrders={purchaseOrders} 
                isLoading={isLoading}
                onEdit={handleEditPO}
                onDelete={handleDeletePO}
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-6">
              <PurchaseOrderList 
                purchaseOrders={purchaseOrders.filter(po => po.status === 'pending')} 
                isLoading={isLoading}
                onEdit={handleEditPO}
                onDelete={handleDeletePO}
              />
            </TabsContent>
            <TabsContent value="ordered" className="mt-6">
              <PurchaseOrderList 
                purchaseOrders={purchaseOrders.filter(po => po.status === 'ordered')} 
                isLoading={isLoading}
                onEdit={handleEditPO}
                onDelete={handleDeletePO}
              />
            </TabsContent>
            <TabsContent value="received" className="mt-6">
              <PurchaseOrderList 
                purchaseOrders={purchaseOrders.filter(po => po.status === 'received')} 
                isLoading={isLoading}
                onEdit={handleEditPO}
                onDelete={handleDeletePO}
              />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Purchase;
