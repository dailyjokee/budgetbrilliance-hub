
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define Contact type
export interface Contact {
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

// Define context type
interface ContactContextType {
  contacts: Contact[];
  isLoading: boolean;
  error: Error | null;
  createContact: (contact: Omit<Contact, 'id'>) => Promise<void>;
  updateContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

// Create the context
const ContactContext = createContext<ContactContextType>({
  contacts: [],
  isLoading: false,
  error: null,
  createContact: async () => {},
  updateContact: async () => {},
  deleteContact: async () => {},
});

// Create a provider component
export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Mock data for demonstration
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        type: 'customer',
        status: 'active',
        company: 'ABC Corp'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '098-765-4321',
        type: 'supplier',
        status: 'active',
        company: 'XYZ Supplies'
      }
    ];
    
    setContacts(mockContacts);
    setIsLoading(false);
  }, []);

  // CRUD operations
  const createContact = async (contact: Omit<Contact, 'id'>): Promise<void> => {
    const newContact = {
      ...contact,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
    };
    
    setContacts([...contacts, newContact]);
  };

  const updateContact = async (updatedContact: Contact): Promise<void> => {
    setContacts(
      contacts.map((contact) => 
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const deleteContact = async (id: string): Promise<void> => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        isLoading,
        error,
        createContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

// Create a hook for using the contact context
export const useContacts = () => {
  const context = useContext(ContactContext);
  
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  
  return context;
};
