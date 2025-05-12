
export type ContactType = 'customer' | 'supplier';

export interface Contact {
  id: string;
  type: ContactType;
  name: string;
  email: string;
  phone: string;
  address: string;
  company?: string;
  status: 'active' | 'inactive';
}

interface ContactFilter {
  type?: 'all' | ContactType;
  search?: string;
}

// Mock data
const mockContacts: Contact[] = [
  {
    id: '1',
    type: 'customer',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    company: 'ABC Corporation',
    status: 'active',
  },
  {
    id: '2',
    type: 'customer',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(555) 987-6543',
    address: '456 Oak Ave, Somewhere, USA',
    company: 'XYZ Industries',
    status: 'active',
  },
  {
    id: '3',
    type: 'supplier',
    name: 'Acme Supplies',
    email: 'info@acmesupplies.com',
    phone: '(555) 321-7890',
    address: '789 Industry Blvd, Business Park, USA',
    company: 'Acme Supplies Inc.',
    status: 'active',
  },
  {
    id: '4',
    type: 'supplier',
    name: 'Global Materials',
    email: 'contact@globalmaterials.com',
    phone: '(555) 456-7890',
    address: '101 Commerce St, Market City, USA',
    company: 'Global Materials Ltd.',
    status: 'inactive',
  },
  {
    id: '5',
    type: 'customer',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 234-5678',
    address: '202 Pine St, Elsewhere, USA',
    company: 'Johnson & Associates',
    status: 'active',
  }
];

// Service functions
export const getContacts = async (filter: ContactFilter = {}): Promise<Contact[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredContacts = [...mockContacts];
  
  // Apply type filter
  if (filter.type && filter.type !== 'all') {
    filteredContacts = filteredContacts.filter(contact => contact.type === filter.type);
  }
  
  // Apply search filter
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filteredContacts = filteredContacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.company?.toLowerCase().includes(searchLower) ||
        contact.phone.includes(filter.search!)
      );
    });
  }
  
  return filteredContacts;
};

export const createContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newContact: Contact = {
    ...contact,
    id: Date.now().toString(),
  };
  
  mockContacts.push(newContact);
  
  return newContact;
};

export const updateContact = async (contact: Contact): Promise<Contact> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockContacts.findIndex(c => c.id === contact.id);
  
  if (index !== -1) {
    mockContacts[index] = contact;
    return contact;
  }
  
  throw new Error('Contact not found');
};

export const deleteContact = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockContacts.findIndex(c => c.id === id);
  
  if (index !== -1) {
    mockContacts.splice(index, 1);
    return;
  }
  
  throw new Error('Contact not found');
};
