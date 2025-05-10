
export type ContactType = 'customer' | 'supplier';

export interface Contact {
  id: string;
  name: string;
  type: ContactType;
  email: string;
  phone: string;
  address: string;
  company?: string;
  status: 'active' | 'inactive';
}

// Mock data and functions
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    type: 'customer',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    company: 'Acme Inc',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    type: 'supplier',
    email: 'jane@example.com',
    phone: '(555) 987-6543',
    address: '456 Oak St, Anytown, USA',
    company: 'Smith Supplies',
    status: 'active',
  },
];

export const getContacts = async (): Promise<Contact[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockContacts), 500);
  });
};

export const getContactById = async (id: string): Promise<Contact | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockContacts.find(contact => contact.id === id)), 500);
  });
};

export const createContact = async (contact: Omit<Contact, "id">): Promise<Contact> => {
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
