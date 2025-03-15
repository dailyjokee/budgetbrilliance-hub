
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon, FilterIcon, BarChart3Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ProductList } from '@/components/inventory/ProductList';
import { ProductForm } from '@/components/inventory/ProductForm';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useInventory } from '@/context/InventoryContext';

const Inventory = () => {
  const { 
    products, 
    isLoading, 
    filter, 
    setFilter, 
    createProduct, 
    updateProduct, 
    deleteProduct 
  } = useInventory();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | undefined>(undefined);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: e.target.value });
  };
  
  const handleTabChange = (value: string) => {
    // Fix type error by ensuring value is one of the allowed types
    const categoryValue = value === 'all' 
      ? 'all' 
      : (value === 'low-stock' ? 'low-stock' : value) as 'all' | 'raw' | 'finished' | 'low-stock';
    
    setFilter({ 
      ...filter, 
      category: categoryValue
    });
  };
  
  const handleCreateProduct = async (data: any) => {
    try {
      await createProduct(data);
      setIsFormOpen(false);
      toast.success('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };
  
  const handleUpdateProduct = async (data: any) => {
    if (!selectedProduct) return;
    
    try {
      await updateProduct({
        ...selectedProduct,
        ...data,
      });
      setIsFormOpen(false);
      setSelectedProduct(undefined);
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const handleDeleteProduct = async (product: any) => {
    try {
      await deleteProduct(product.id);
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={filter.search || ''}
                  onChange={handleSearch}
                />
              </div>
              
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <BarChart3Icon className="h-4 w-4" />
              </Button>
              
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedProduct(undefined)}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedProduct ? 'Edit Product' : 'Create Product'}
                    </DialogTitle>
                  </DialogHeader>
                  <ProductForm
                    product={selectedProduct}
                    onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setSelectedProduct(undefined);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={filter.category || 'all'} onValueChange={handleTabChange}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="raw">Raw Materials</TabsTrigger>
              <TabsTrigger value="finished">Finished Goods</TabsTrigger>
              <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <ProductList 
                products={products} 
                isLoading={isLoading}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </TabsContent>
            <TabsContent value="raw" className="mt-6">
              <ProductList 
                products={products} 
                isLoading={isLoading}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </TabsContent>
            <TabsContent value="finished" className="mt-6">
              <ProductList 
                products={products} 
                isLoading={isLoading}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </TabsContent>
            <TabsContent value="low-stock" className="mt-6">
              <ProductList 
                products={products} 
                isLoading={isLoading}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Inventory;
