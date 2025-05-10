
import React from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import DashboardLayout from '../layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import RevenueCards from '../components/reports/RevenueCards';
import AnalyticsSection from '../components/reports/AnalyticsSection';
import ExportSection from '../components/reports/ExportSection';

const Reports = () => {
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
              <RevenueCards />
            </TabsContent>
            
            <TabsContent value="analytics">
              <AnalyticsSection />
            </TabsContent>
            
            <TabsContent value="export" className="space-y-4">
              <ExportSection />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Reports;
