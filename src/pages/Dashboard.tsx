
import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { LayoutGrid, Users, ShoppingCart, CreditCard } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Welcome back, User
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Sales"
            value="$24,780"
            change={12}
            color="primary"
            icon={<CreditCard />}
          />
          <StatCard 
            title="Customers"
            value="573"
            change={8}
            color="success"
            icon={<Users />}
          />
          <StatCard 
            title="Products"
            value="128"
            change={0}
            color="warning"
            icon={<ShoppingCart />}
          />
          <StatCard 
            title="Revenue"
            value="$17,890"
            change={-4}
            color="danger"
            icon={<LayoutGrid />}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2">
            <div className="rounded-xl border bg-card text-card-foreground">
              <div className="p-6">
                <h3 className="font-semibold tracking-tight">Cash Flow</h3>
                <div className="h-[300px] w-full"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-xl border bg-card text-card-foreground">
              <div className="p-6">
                <h3 className="font-semibold tracking-tight">Recent Transactions</h3>
                <div className="mt-4 space-y-4">
                  <p>No recent transactions found.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
