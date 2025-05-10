import React, { useState } from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import DashboardLayout from '../layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { PlusIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { Input } from '../components/ui/input';
import { ContactList } from '../components/contacts/ContactList';
import { ContactForm } from '../components/contacts/ContactForm';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogTrigger 
} from '../components/ui/dialog';
import { toast } from 'sonner';
import { useContacts } from '../context/ContactContext';

const Contacts = () => {
  const { 
    contacts, 
    isLoading, 
    filter, 
    setFilter, 
    createContact, 
    updateContact, 
    deleteContact 
  } = useContacts();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any | undefined>(undefined);
  
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
  
  const handleCreateContact = async (data: any) => {
    try {
      await createContact(data);
      setIsFormOpen(false);
      toast.success('Contact created successfully');
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };
  
  const handleEditContact = (contact: any) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  };
  
  const handleUpdateContact = async (data: any) => {
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
  
  const handleDeleteContact = async (contact: any) => {
    try {
      await deleteContact(contact.id);
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };
  
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
                  <ContactForm
                    contact={selectedContact}
                    onSubmit={selectedContact ? handleUpdateContact : handleCreateContact}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setSelectedContact(undefined);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={filter.type || 'all'} onValueChange={handleTabChange}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All Contacts</TabsTrigger>
              <TabsTrigger value="customer">Customers</TabsTrigger>
              <TabsTrigger value="supplier">Suppliers</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <ContactList 
                contacts={contacts} 
                isLoading={isLoading}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
            </TabsContent>
            <TabsContent value="customer" className="mt-6">
              <ContactList 
                contacts={contacts} 
                isLoading={isLoading}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
            </TabsContent>
            <TabsContent value="supplier" className="mt-6">
              <ContactList 
                contacts={contacts} 
                isLoading={isLoading}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Contacts;
