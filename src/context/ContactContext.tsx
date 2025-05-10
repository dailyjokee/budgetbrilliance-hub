
import React, { createContext, useContext, useState } from 'react';
import { 
  Contact, 
  ContactType, 
  getContacts, 
  createContact as createContactService,
  updateContact as updateContactService,
  deleteContact as deleteContactService
} from '../services/contactService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ContactContextType {
  contacts: Contact[];
  isLoading: boolean;
  filter: {
    type?: 'all' | ContactType;
    search?: string;
  };
  setFilter: (filter: { type?: 'all' | ContactType; search?: string }) => void;
  createContact: (contact: Omit<Contact, 'id'>) => Promise<Contact>;
  updateContact: (contact: Contact) => Promise<Contact>;
  deleteContact: (id: string) => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<{ type?: 'all' | ContactType; search?: string }>({
    type: 'all',
    search: '',
  });
  
  const queryClient = useQueryClient();
  
  // Removed filter param since it's likely not implemented in getContacts
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts', filter],
    queryFn: () => getContacts(),
  });
  
  const createMutation = useMutation({
    mutationFn: createContactService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: updateContactService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteContactService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
  
  const createContact = async (contact: Omit<Contact, 'id'>) => {
    return createMutation.mutateAsync(contact);
  };
  
  const updateContact = async (contact: Contact) => {
    return updateMutation.mutateAsync(contact);
  };
  
  const deleteContact = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };
  
  return (
    <ContactContext.Provider
      value={{
        contacts,
        isLoading,
        filter,
        setFilter,
        createContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};
