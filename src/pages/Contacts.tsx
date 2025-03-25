
import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { PlusIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { Input } from '../components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogTrigger 
} from '../components/ui/dialog';
import { toast } from 'sonner';
import { useContacts } from '../context/ContactContext';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'supplier';
  status: 'active' | 'inactive';
  address?: string;
  notes?: string;
  company?: string;
}

const Contacts = () => {
  const { 
    contacts, 
    isLoading, 
    createContact, 
    updateContact, 
    deleteContact 
  } = useContacts();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined);
  const [filter, setFilter] = useState({ 
    type: 'all' as 'all' | 'customer' | 'supplier',
    search: '' 
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: e.target.value });
  };
  
  const handleTabChange = (value: string) => {
    setFilter({ 
      ...filter, 
      type: value === 'all' 
        ? 'all' 
        : value === 'customer' 
          ? 'customer' 
          : 'supplier' 
    });
  };
  
  const handleCreateContact = async (data: Omit<Contact, 'id'>) => {
    try {
      await createContact(data);
      setIsFormOpen(false);
      toast.success('Contact created successfully');
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };
  
  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  };
  
  const handleUpdateContact = async (data: Omit<Contact, 'id'>) => {
    if (!selectedContact) return;
    
    try {
      await updateContact({
        ...selectedContact,
        ...data,
      });
      setIsFormOpen(false);
      setSelectedContact(undefined);
      toast.success('Contact updated successfully');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };
  
  const handleDeleteContact = async (contact: Contact) => {
    try {
      await deleteContact(contact.id);
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Filter contacts based on current filter state
  const filteredContacts = contacts.filter(contact => {
    // Search filter
    if (filter.search && !contact.name.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    
    // Type filter
    if (filter.type !== 'all' && contact.type !== filter.type) {
      return false;
    }
    
    return true;
  });
  
  return (
    <DashboardLayout>
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
                value={filter.search || ''}
                onChange={handleSearch}
              />
            </div>
            
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedContact(undefined)}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    {selectedContact ? 'Edit Contact' : 'Create Contact'}
                  </DialogTitle>
                </DialogHeader>
                {/* Contact form would go here */}
                <div className="grid gap-4 py-4">
                  <p>Contact form placeholder</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                    <Button>Save Contact</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={filter.type} onValueChange={handleTabChange}>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">All Contacts</TabsTrigger>
            <TabsTrigger value="customer">Customers</TabsTrigger>
            <TabsTrigger value="supplier">Suppliers</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {/* Contact list would go here */}
            <p>All contacts placeholder</p>
          </TabsContent>
          <TabsContent value="customer" className="mt-6">
            {/* Customer list would go here */}
            <p>Customers placeholder</p>
          </TabsContent>
          <TabsContent value="supplier" className="mt-6">
            {/* Supplier list would go here */}
            <p>Suppliers placeholder</p>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Contacts;
