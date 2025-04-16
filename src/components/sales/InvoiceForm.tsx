
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PlusIcon, TrashIcon } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Card, CardContent } from '../ui/card';

// Form schema definition
const formSchema = z.object({
  customer: z.string().min(1, { message: 'Customer is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  dueDate: z.string().min(1, { message: 'Due date is required' }),
  status: z.enum(['draft', 'sent', 'paid', 'overdue']),
  items: z.array(
    z.object({
      product: z.string().min(1, { message: 'Product is required' }),
      description: z.string().optional(),
      quantity: z.coerce.number().min(1, { message: 'Quantity must be at least 1' }),
      price: z.coerce.number().min(0, { message: 'Price must be 0 or greater' }),
    })
  ).min(1, { message: 'At least one item is required' }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Sample data for the form
const sampleCustomers = [
  { id: '1', name: 'Acme Inc.' },
  { id: '2', name: 'Wayne Enterprises' },
  { id: '3', name: 'Stark Industries' },
  { id: '4', name: 'Umbrella Corporation' },
];

const sampleProducts = [
  { id: '1', name: 'Product A', price: 199.99 },
  { id: '2', name: 'Product B', price: 299.99 },
  { id: '3', name: 'Product C', price: 99.99 },
  { id: '4', name: 'Product D', price: 499.99 },
];

interface InvoiceFormProps {
  invoice?: any;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: invoice?.customer || '',
      date: invoice?.date || new Date().toISOString().split('T')[0],
      dueDate: invoice?.dueDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      status: invoice?.status || 'draft',
      items: invoice?.items || [
        { product: '', description: '', quantity: 1, price: 0 }
      ],
      notes: invoice?.notes || '',
    },
  });
  
  const items = form.watch('items');
  
  const addItem = () => {
    const currentItems = form.getValues('items') || [];
    form.setValue('items', [
      ...currentItems,
      { product: '', description: '', quantity: 1, price: 0 }
    ]);
  };
  
  const removeItem = (index: number) => {
    const currentItems = form.getValues('items');
    form.setValue('items', currentItems.filter((_, i) => i !== index));
  };
  
  // Handle product selection and auto-populate price
  const handleProductChange = (index: number, productId: string) => {
    const product = sampleProducts.find(p => p.id === productId);
    if (product) {
      form.setValue(`items.${index}.price`, product.price);
    }
  };
  
  // Calculate totals
  const calculateSubtotal = (items: any[]) => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };
  
  const calculateTax = (subtotal: number) => {
    return subtotal * 0.1; // 10% tax
  };
  
  const calculateTotal = (subtotal: number, tax: number) => {
    return subtotal + tax;
  };
  
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="shadow-sm">
          <CardContent className="p-4 space-y-4">
            <h3 className="text-lg font-medium">Invoice Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sampleCustomers.map(customer => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Invoice Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Invoice Items</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addItem}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
          
          {items.map((_, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-12 md:col-span-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.product`}
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>Product</FormLabel>
                          <Select 
                            onValueChange={(value: string) => {
                              field.onChange(value);
                              handleProductChange(index, value);
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select product" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sampleProducts.map(product => (
                                <SelectItem key={product.id} value={product.id}>
                                  {product.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="col-span-12 md:col-span-3">
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="col-span-4 md:col-span-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="col-span-8 md:col-span-3">
                    <FormField
                      control={form.control}
                      name={`items.${index}.price`}
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel>Unit Price</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tax (10%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center font-medium">
              <span>Total</span>
              <span className="text-lg">{formatCurrency(total)}</span>
            </div>
          </CardContent>
        </Card>
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="Any additional notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {invoice ? 'Update Invoice' : 'Create Invoice'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
