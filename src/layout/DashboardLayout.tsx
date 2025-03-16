import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Menu, 
  X,
  Package,
  ShoppingCart,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, href, active, onClick }: NavItemProps) => (
  <Link 
    to={href} 
    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
      active 
        ? 'bg-primary text-primary-foreground' 
        : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
    {active && <ChevronRight className="ml-auto h-4 w-4" />}
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { pathname } = useLocation();
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  const navItems = [
    { 
      icon: <LayoutDashboard className="h-4 w-4" />, 
      label: 'Dashboard', 
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    { 
      icon: <FileText className="h-4 w-4" />, 
      label: 'Transactions', 
      href: '/transactions',
      active: pathname === '/transactions',
    },
    { 
      icon: <Package className="h-4 w-4" />, 
      label: 'Inventory', 
      href: '/inventory',
      active: pathname === '/inventory',
    },
    { 
      icon: <ShoppingCart className="h-4 w-4" />, 
      label: 'Sales', 
      href: '/sales',
      active: pathname === '/sales',
    },
    { 
      icon: <ShoppingBag className="h-4 w-4" />, 
      label: 'Purchase', 
      href: '/purchase',
      active: pathname === '/purchase',
    },
    { 
      icon: <Users className="h-4 w-4" />, 
      label: 'Contacts', 
      href: '/contacts',
      active: pathname === '/contacts',
    },
  ];
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => isMobile && setSidebarOpen(false);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold">Finesse</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex h-[calc(100vh-57px)] lg:h-screen">
        {/* Sidebar */}
        <aside 
          className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 lg:relative lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="h-full flex flex-col p-4">
            {/* Logo - hidden on mobile as it's in the header */}
            <div className="hidden lg:flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold">Finesse</span>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1 mb-8">
              {navItems.map((item) => (
                <NavItem 
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={item.active}
                  onClick={closeSidebar}
                />
              ))}
            </nav>
            
            <div className="mt-auto space-y-1">
              <NavItem 
                icon={<Settings className="h-4 w-4" />}
                label="Settings"
                href="/settings"
                active={pathname === '/settings'}
                onClick={closeSidebar}
              />
              <Link 
                to="/" 
                className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                onClick={closeSidebar}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </aside>
        
        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={closeSidebar}
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
