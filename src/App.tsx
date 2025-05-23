
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Inventory from "./pages/Inventory";
import Purchase from "./pages/Purchase";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import { TransactionProvider } from "./context/TransactionContext";
import { ContactProvider } from "./context/ContactContext";
import { InventoryProvider } from "./context/InventoryContext";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TransactionProvider>
          <ContactProvider>
            <InventoryProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/purchase" element={<Purchase />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/reports" element={<Reports />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </InventoryProvider>
          </ContactProvider>
        </TransactionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
