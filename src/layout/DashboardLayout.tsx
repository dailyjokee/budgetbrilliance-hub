
import React from 'react';
import { Button } from '../components/ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/dashboard" className="text-xl font-bold">
              Budget<span className="text-primary">Brilliance</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center gap-5">
            <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
            <a href="/contacts" className="text-sm font-medium hover:text-primary transition-colors">Contacts</a>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Account
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
