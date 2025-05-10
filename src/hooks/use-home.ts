
import { useState, useEffect } from 'react';

interface Invoice {
  id: string;
  invoice: string;
  customer: string;
  status: string;
  amount: string;
}

export default function useHome() {
  const [data, setData] = useState<Invoice[]>([
    {
      id: '1',
      invoice: 'INV001',
      customer: 'Apple Inc.',
      status: 'Paid',
      amount: '$250.00',
    },
    {
      id: '2',
      invoice: 'INV002',
      customer: 'Microsoft',
      status: 'Pending',
      amount: '$150.00',
    },
    {
      id: '3',
      invoice: 'INV003',
      customer: 'Amazon',
      status: 'Unpaid',
      amount: '$350.00',
    },
    {
      id: '4',
      invoice: 'INV004',
      customer: 'Tesla, Inc.',
      status: 'Paid',
      amount: '$450.00',
    },
    {
      id: '5',
      invoice: 'INV005',
      customer: 'Google',
      status: 'Paid',
      amount: '$550.00',
    },
    {
      id: '6',
      invoice: 'INV006',
      customer: 'Meta',
      status: 'Pending',
      amount: '$200.00',
    },
    {
      id: '7',
      invoice: 'INV007',
      customer: 'Netflix',
      status: 'Unpaid',
      amount: '$350.00',
    },
    {
      id: '8',
      invoice: 'INV008',
      customer: 'Spotify',
      status: 'Paid',
      amount: '$250.00',
    }
  ]);

  return { data };
}
