
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import useHome from '../../hooks/use-home';

interface Invoice {
  id: string;
  invoice: string;
  customer: string;
  status: string;
  amount: string;
}

const AnalyticsSection = () => {
  const { data } = useHome();
  
  // Safety check to make sure data is available
  const invoices = data || [];
  
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Sales Analytics</h2>
      <p className="mb-8">
        Explore detailed insights into your sales performance over time.
      </p>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>
                A summary of all revenue generated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$123,456</div>
              <p className="text-sm text-gray-500">
                Compared to $100,000 last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Order Value</CardTitle>
              <CardDescription>
                The average amount spent per order.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$456.78</div>
              <p className="text-sm text-gray-500">
                Up from $400 last year
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Product Performance</h3>
        <Table>
          <TableCaption>
            A comprehensive list of all invoices
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice: Invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Customer Demographics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Customers</CardTitle>
              <CardDescription>
                Number of new customers acquired.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">500</div>
              <p className="text-sm text-gray-500">
                Compared to 400 last year
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsSection;
