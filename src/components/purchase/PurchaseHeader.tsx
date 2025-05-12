
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon, FilterIcon, ArrowDownUpIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { PurchaseOrderForm } from './PurchaseOrderForm';

interface PurchaseHeaderProps {
  filter: { status: string, search: string };
  setFilter: (filter: { status: string, search: string }) => void;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  selectedPO: any | undefined;
  setSelectedPO: (po: any | undefined) => void;
  handleCreatePO: (data: any) => Promise<void>;
  handleUpdatePO: (data: any) => Promise<void>;
}

export const PurchaseHeader: React.FC<PurchaseHeaderProps> = ({
  filter,
  setFilter,
  isFormOpen,
  setIsFormOpen,
  selectedPO,
  setSelectedPO,
  handleCreatePO,
  handleUpdatePO
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: e.target.value });
  };

  return (
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
  );
};
