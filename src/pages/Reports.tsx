import React, { useState } from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import DashboardLayout from '../layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart3Icon, Calendar, CreditCard, Download, PieChart } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { pageVariants } from '../components/transitions/PageTransition';
import useHome from '../hooks/use-home';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Users } from 'lucide-react';

interface Invoice {
  id: string;
  invoice: string;
  customer: string;
  status: string;
  amount: string;
}

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data } = useHome();

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Here is a summary of your accounting activity.
            </p>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-sm text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subscriptions
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-sm text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-sm text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">721</div>
                    <p className="text-sm text-muted-foreground">
                      +5% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics">
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
                      A comprehensive list of all invoinces
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
                      {data?.map((invoice: Invoice) => (
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
            </TabsContent>
            <TabsContent value="export" className="space-y-4">
              <div className="container mx-auto py-10">
                <h2 className="text-2xl font-bold mb-4">Export Reports</h2>
                <p className="mb-8">
                  Generate and download reports in various formats for your
                  accounting needs.
                </p>

                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Date Range</h3>
                  <div className="flex items-center space-x-4">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                    <p>Select Date Range:</p>
                    <div className="relative">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                      {date ? (
                        <p className="font-medium mt-2">
                          {format(date, 'PPP')}
                        </p>
                      ) : (
                        <p className="text-muted-foreground mt-2">
                          Click to select a date
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">Report Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p>Generate Sales Report (CSV)</p>
                      <Button variant="outline">
                        Download <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Generate Financial Statement (PDF)</p>
                      <Button variant="outline">
                        Download <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6M23 11h-6" />
    </svg>
  );
}

export default Reports;
