
import React from 'react';
import { Button } from '../components/ui/button';

const Index = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="w-full border-b">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="text-xl font-bold">
              Budget<span className="text-primary">Brilliance</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center gap-5">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          </nav>
          
          <div className="flex items-center gap-2">
            <a href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </a>
            <a href="/login">
              <Button size="sm">
                Sign Up
              </Button>
            </a>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Manage Your Finances with Ease
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Streamline your business finances with our all-in-one financial management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </a>
              <a href="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-10">
        <div className="container mx-auto">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2023 BudgetBrilliance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
