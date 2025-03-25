
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PurchaseOrderList } from './PurchaseOrderList';

interface PurchaseTabContentProps {
  filter: { status: string, search: string };
  setFilter: (filter: { status: string, search: string }) => void;
  purchaseOrders: any[];
  isLoading: boolean;
  onEdit: (po: any) => void;
  onDelete: (po: any) => void;
}

export const PurchaseTabContent: React.FC<PurchaseTabContentProps> = ({
  filter,
  setFilter,
  purchaseOrders,
  isLoading,
  onEdit,
  onDelete
}) => {
  const handleTabChange = (value: string) => {
    setFilter({ ...filter, status: value });
  };

  const filteredOrders = (status: string) => {
    if (status === 'all') return purchaseOrders;
    return purchaseOrders.filter(po => po.status === status);
  };

  return (
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
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
      <TabsContent value="pending" className="mt-6">
        <PurchaseOrderList 
          purchaseOrders={filteredOrders('pending')} 
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
      <TabsContent value="ordered" className="mt-6">
        <PurchaseOrderList 
          purchaseOrders={filteredOrders('ordered')} 
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
      <TabsContent value="received" className="mt-6">
        <PurchaseOrderList 
          purchaseOrders={filteredOrders('received')} 
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
    </Tabs>
  );
};
