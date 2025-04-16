import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Product } from '../../services/inventoryService';
import { Badge } from '../../components/ui/badge';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Skeleton } from '../../components/ui/skeleton';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by creating a new product
        </p>
      </div>
    );
  }

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Helper function to get category badge style
  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'raw':
        return 'bg-green-50 text-green-600';
      case 'finished':
        return 'bg-blue-50 text-blue-600';
      case 'packaging':
        return 'bg-orange-50 text-orange-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                {product.name}
                {product.quantity <= product.reorderLevel && (
                  <Badge variant="destructive" className="ml-2">
                    Low Stock
                  </Badge>
                )}
              </TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getCategoryBadgeStyle(product.category)}
                >
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {product.quantity} {product.unit}
              </TableCell>
              <TableCell>{formatCurrency(product.cost)}</TableCell>
              <TableCell>{product.price ? formatCurrency(product.price) : 'N/A'}</TableCell>
              <TableCell>
                <Badge
                  variant={product.status === 'active' ? 'default' : 'secondary'}
                >
                  {product.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(product)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
