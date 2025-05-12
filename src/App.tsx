
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Contacts from './pages/Contacts';
import Sales from './pages/Sales';
import Purchase from './pages/Purchase';
import Reports from './pages/Reports';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Index from './pages/Index';

// Contexts
import { ContactProvider } from './context/ContactContext';
import { InventoryProvider } from './context/InventoryContext';
import { TransactionProvider } from './context/TransactionContext';

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ContactProvider>
          <InventoryProvider>
            <TransactionProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
              <Toaster />
            </TransactionProvider>
          </InventoryProvider>
        </ContactProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
