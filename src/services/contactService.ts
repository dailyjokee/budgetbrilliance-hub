
export type ContactType = 'customer' | 'supplier' | 'employee';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: ContactType;
  company?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactFilter {
  type?: 'all' | ContactType;
  search?: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    type: 'customer',
    company: 'ABC Corp',
    address: '123 Main St, Anytown, USA',
    notes: 'Frequent buyer',
    createdAt: '2025-01-15',
    updatedAt: '2025-03-20'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    type: 'supplier',
    company: 'XYZ Supplies',
    address: '456 Oak Ave, Business City, USA',
    createdAt: '2025-02-10',
    updatedAt: '2025-02-10'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '555-123-4567',
    type: 'employee',
    notes: 'Sales department',
    createdAt: '2025-01-05',
    updatedAt: '2025-04-12'
  }
];

export const getContacts = async (filter?: ContactFilter): Promise<Contact[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredContacts = [...mockContacts];
      
      if (filter?.type && filter.type !== 'all') {
        filteredContacts = filteredContacts.filter(contact => contact.type === filter.type);
      }
      
      if (filter?.search) {
        const searchLower = filter.search.toLowerCase();
        filteredContacts = filteredContacts.filter(contact => 
          contact.name.toLowerCase().includes(searchLower) || 
          contact.email.toLowerCase().includes(searchLower) || 
          contact.company?.toLowerCase().includes(searchLower)
        );
      }
      
      resolve(filteredContacts);
    }, 500);
  });
};

export const createContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
  // Simulate API call
  const newContact = {
    ...contact,
    id: Date.now().toString(),
  };
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(newContact), 500);
  });
};

export const updateContact = async (contact: Contact): Promise<Contact> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(contact), 500);
  });
};

export const deleteContact = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};
