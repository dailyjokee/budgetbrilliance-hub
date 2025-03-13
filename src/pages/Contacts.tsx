
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterIcon, PlusIcon, SearchIcon, UserIcon, BuildingIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { contentVariants } from '@/components/transitions/PageTransition';
import { toast } from 'sonner';

// Mock contacts data with proper type annotations
const mockContacts = [
  {
    id: 'c1',
    type: 'customer' as const,
    name: 'Acme Corporation',
    email: 'info@acmecorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, New York, NY 10001',
    balance: 2500,
    status: 'active' as const
  },
  {
    id: 'c2',
    type: 'supplier' as const,
    name: 'Tech Supplies Inc',
    email: 'orders@techsupplies.com',
    phone: '+1 (555) 987-6543',
    address: '456 Vendor St, Chicago, IL 60601',
    balance: -1450,
    status: 'active' as const
  },
  {
    id: 'c3',
    type: 'customer' as const,
    name: 'Global Enterprises',
    email: 'contact@globalent.com',
    phone: '+1 (555) 333-2222',
    address: '789 Corporate Pkwy, Los Angeles, CA 90001',
    balance: 4750,
    status: 'inactive' as const
  },
  {
    id: 'c4',
    type: 'supplier' as const,
    name: 'Office Depot',
    email: 'support@officedepot.com',
    phone: '+1 (555) 444-5555',
    address: '321 Supply Rd, Boston, MA 02101',
    balance: -350,
    status: 'active' as const
  },
  {
    id: 'c5',
    type: 'customer' as const,
    name: 'Johnson & Partners',
    email: 'info@johnsonpartners.com',
    phone: '+1 (555) 777-8888',
    address: '555 Consulting Blvd, Miami, FL 33101',
    balance: 1200,
    status: 'active' as const
  },
];

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredContacts = mockContacts.filter(contact => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'customers' && contact.type === 'customer') || 
      (activeTab === 'suppliers' && contact.type === 'supplier');
    
    return matchesSearch && matchesTab;
  });
  
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
              
              <Button onClick={() => toast.info('New contact modal would open here')}>
                <PlusIcon className="h-4 w-4 mr-2" />
                New
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All Contacts</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <ContactList contacts={filteredContacts} />
            </TabsContent>
            <TabsContent value="customers" className="mt-6">
              <ContactList contacts={filteredContacts} />
            </TabsContent>
            <TabsContent value="suppliers" className="mt-6">
              <ContactList contacts={filteredContacts} />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

interface Contact {
  id: string;
  type: 'customer' | 'supplier';
  name: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  status: 'active' | 'inactive';
}

interface ContactListProps {
  contacts: Contact[];
}

const ContactList = ({ contacts }: ContactListProps) => {
  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-muted p-3 mb-4">
          <SearchIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No contacts found</h3>
        <p className="text-muted-foreground text-center mt-1 max-w-md">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="rounded-lg border overflow-hidden"
      variants={contentVariants(0.1)}
      initial="initial"
      animate="animate"
    >
      {/* Table header */}
      <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_auto_auto_auto_auto] gap-4 p-4 bg-muted text-sm font-medium">
        <div>Contact</div>
        <div className="hidden md:block">Email</div>
        <div className="hidden md:block">Phone</div>
        <div>Balance</div>
        <div className="text-right">Actions</div>
      </div>
      
      {/* Table rows */}
      <div className="divide-y">
        {contacts.map((contact, index) => (
          <motion.div 
            key={contact.id}
            className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_auto_auto_auto_auto] gap-4 p-4 items-center hover:bg-muted/50 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.03 * index }
            }}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
          >
            {/* Contact */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                contact.type === 'customer' 
                  ? 'bg-blue-500/10 text-blue-500' 
                  : 'bg-amber-500/10 text-amber-500'
              }`}>
                {contact.type === 'customer' ? (
                  <UserIcon size={18} />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="lucide lucide-building">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 22V16h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 10h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 10h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              
              <div className="truncate">
                <div className="font-medium truncate">{contact.name}</div>
                <div className="text-xs text-muted-foreground truncate md:hidden">{contact.email}</div>
                <div className="md:hidden text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <span className={`inline-flex w-2 h-2 rounded-full ${
                    contact.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}></span>
                  <span className="capitalize">{contact.status}</span>
                </div>
              </div>
            </div>
            
            {/* Email */}
            <div className="hidden md:block text-sm truncate">{contact.email}</div>
            
            {/* Phone */}
            <div className="hidden md:block text-sm">{contact.phone}</div>
            
            {/* Balance */}
            <div className={`font-medium ${
              contact.balance >= 0
                ? 'text-emerald-500' 
                : 'text-rose-500'
            }`}>
              ${Math.abs(contact.balance).toFixed(2)}
            </div>
            
            {/* Actions */}
            <div className="flex justify-end items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs"
                onClick={() => toast.info(`View contact ${contact.id}`)}
              >
                View
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Contacts;
