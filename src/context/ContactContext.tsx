
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Contact types
export type ContactType = 'customer' | 'supplier' | 'vendor' | 'employee' | 'other';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: ContactType;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  notes?: string;
  createdAt: string;
}

// Context type
interface ContactContextType {
  contacts: Contact[];
  isLoading: boolean;
  error: Error | null;
  refreshContacts: () => Promise<void>;
  createContact: (contact: Omit<Contact, "id" | "createdAt">) => Promise<void>;
  updateContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

// Create context
const ContactContext = createContext<ContactContextType | undefined>(undefined);

// Sample data
const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'info@acmecorp.com',
    phone: '555-123-4567',
    type: 'customer',
    company: 'Acme Corporation',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
    notes: 'Key enterprise customer',
    createdAt: '2023-01-15'
  },
  {
    id: '2',
    name: 'Paper Supplies Inc',
    email: 'orders@papersupplies.com',
    phone: '555-987-6543',
    type: 'supplier',
    company: 'Paper Supplies Incorporated',
    address: '456 Supply Ave',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    country: 'USA',
    notes: 'Main paper supplier',
    createdAt: '2023-02-10'
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-555-5555',
    type: 'customer',
    company: 'Smith Designs',
    address: '789 Creative Blvd',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    createdAt: '2023-03-20'
  },
];

// Provider component
export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshContacts = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setContacts(sampleContacts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const createContact = async (contact: Omit<Contact, "id" | "createdAt">) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newContact: Contact = {
        ...contact,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setContacts(prev => [newContact, ...prev]);
      toast.success('Contact created successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to create contact');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateContact = async (contact: Contact) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setContacts(prev => prev.map(c => c.id === contact.id ? contact : c));
      toast.success('Contact updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to update contact');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setContacts(prev => prev.filter(c => c.id !== id));
      toast.success('Contact deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      toast.error('Failed to delete contact');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshContacts();
  }, []);

  const value = {
    contacts,
    isLoading,
    error,
    refreshContacts,
    createContact,
    updateContact,
    deleteContact
  };

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};

// Hook for using the context
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};
