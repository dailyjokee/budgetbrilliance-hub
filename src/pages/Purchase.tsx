import React, { useState } from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import DashboardLayout from '../layout/DashboardLayout';
import { toast } from 'sonner';
import { PurchaseHeader } from '../components/purchase/PurchaseHeader';
import { PurchaseTabContent } from '../components/purchase/PurchaseTabContent';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import { PurchaseOrderForm } from '../components/purchase/PurchaseOrderForm';

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
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">Purchase Orders</h1>
          </div>
          
          <PurchaseHeader
            filter={filter}
            setFilter={setFilter}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            selectedPO={selectedPO}
            setSelectedPO={setSelectedPO}
            handleCreatePO={handleCreatePO}
            handleUpdatePO={handleUpdatePO}
          />
          
          <PurchaseTabContent
            filter={filter}
            setFilter={setFilter}
            purchaseOrders={purchaseOrders}
            isLoading={isLoading}
            onEdit={handleEditPO}
            onDelete={handleDeletePO}
          />
          
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>
                  {selectedPO ? 'Edit Purchase Order' : 'Create Purchase Order'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details to {selectedPO ? 'update' : 'create'} a purchase order
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
                <div className="pr-3">
                  <PurchaseOrderForm
                    purchaseOrder={selectedPO}
                    onSubmit={selectedPO ? handleUpdatePO : handleCreatePO}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setSelectedPO(undefined);
                    }}
                  />
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Purchase;
