
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  CreditCard, 
  FileText, 
  Home, 
  Menu, 
  Users, 
  X, 
  Settings, 
  LogOut, 
  Bell,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, icon: Icon, label, isActive, isMobile, onClick }: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative",
              isActive 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
            onClick={onClick}
          >
            <Icon size={20} className={cn("shrink-0", isActive && "text-primary")} />
            {!isMobile && <span className="font-medium">{label}</span>}
            {isActive && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        </TooltipTrigger>
        {isMobile && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/transactions", icon: CreditCard, label: "Transactions" },
    { href: "/contacts", icon: Users, label: "Contacts" },
    { href: "/reports", icon: BarChart3, label: "Reports" },
    { href: "/documents", icon: FileText, label: "Documents" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile nav overlay */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-50 h-full bg-card border-r shadow-subtle transition-transform duration-300 ease-in-out",
          isMobile 
            ? isMenuOpen 
              ? "translate-x-0 w-64" 
              : "-translate-x-full w-64" 
            : "w-64 translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="h-14 flex items-center justify-between px-3 border-b">
            <Link to="/dashboard" className="flex items-center gap-2 px-2" onClick={closeMenu}>
              <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold text-base">Finesse</span>
            </Link>
            
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={closeMenu}>
                <X size={20} />
              </Button>
            )}
          </div>
          
          {/* Main navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavItem
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    isActive={location.pathname === item.href}
                    isMobile={false}
                    onClick={closeMenu}
                  />
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Sidebar footer */}
          <div className="mt-auto p-3 border-t">
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className={cn("flex-1 flex flex-col min-h-screen", 
        isMobile ? "ml-0" : "ml-64"
      )}>
        {/* Header */}
        <header className="h-14 border-b flex items-center justify-between px-4 bg-card/80 backdrop-blur-md sticky top-0 z-30">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu size={20} />
            </Button>
          )}
          
          <div className={cn("flex-1", isMobile ? "ml-4" : "")}>
            <div className="relative max-w-md">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input 
                type="search" 
                placeholder="Search..." 
                className="w-full h-9 rounded-md bg-muted/50 px-9 focus:outline-none focus:ring-1 focus:ring-ring text-sm" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Settings size={20} />
            </Button>
          </div>
        </header>
        
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
