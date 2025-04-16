
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

// Mock data
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    type: 'customer',
    email: 'john@example.com',
    phone: '555-1234',
    address: '123 Main St, Anytown, USA',
    company: 'Acme Inc',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    type: 'supplier',
    email: 'jane@example.com',
    phone: '555-5678',
    address: '456 Oak Ave, Somewhere, USA',
    company: 'Smith Supplies',
    status: 'active',
  },
];

export async function getContacts(filter?: { type?: 'all' | ContactType; search?: string }): Promise<Contact[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredContacts = [...mockContacts];

  if (filter) {
    if (filter.type && filter.type !== 'all') {
      filteredContacts = filteredContacts.filter(contact => contact.type === filter.type);
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredContacts = filteredContacts.filter(contact => 
        contact.name.toLowerCase().includes(searchLower) || 
        contact.email.toLowerCase().includes(searchLower) ||
        (contact.company && contact.company.toLowerCase().includes(searchLower))
      );
    }
  }

  return filteredContacts;
}

export async function createContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const newContact: Contact = {
    ...contact,
    id: Math.random().toString(36).substring(2, 9),
  };

  mockContacts.push(newContact);
  return newContact;
}

export async function updateContact(contact: Contact): Promise<Contact> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockContacts.findIndex(c => c.id === contact.id);
  if (index >= 0) {
    mockContacts[index] = contact;
    return contact;
  }
  throw new Error('Contact not found');
}

export async function deleteContact(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockContacts.findIndex(c => c.id === id);
  if (index >= 0) {
    mockContacts.splice(index, 1);
    return;
  }
  throw new Error('Contact not found');
}
