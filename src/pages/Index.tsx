
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Nav */}
      <header className="w-full border-b bg-card/80 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold">Finesse</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline" size="sm">Log in</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero */}
      <section className="flex-1 w-full relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-24 lg:pt-32 pb-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Financial management reimagined
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6"
            >
              Accounting that <br className="md:hidden" />
              <span className="text-primary">works</span> for you
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10"
            >
              Simplify your business finances with our intuitive accounting platform. 
              Track expenses, manage invoices, and gain valuable insights—all in one place.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                View Demo
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 md:mt-24 relative"
          >
            <div className="glass-card rounded-2xl shadow-subtle overflow-hidden border">
              <div className="aspect-[16/9]">
                {/* Replace with actual dashboard screenshot */}
                <div className="w-full h-full bg-card flex items-center justify-center">
                  <div className="w-full max-w-5xl px-8 py-6">
                    <div className="flex flex-col gap-4">
                      <div className="w-full flex items-center justify-between mb-2">
                        <div className="h-8 bg-primary/5 w-40 rounded-md"></div>
                        <div className="flex gap-2">
                          <div className="h-8 w-8 rounded-md bg-primary/10"></div>
                          <div className="h-8 w-8 rounded-md bg-primary/10"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-28 rounded-xl bg-primary/5 p-4">
                          <div className="h-4 w-24 bg-primary/10 rounded mb-4"></div>
                          <div className="h-6 w-32 bg-primary/20 rounded mb-2"></div>
                          <div className="h-3 w-20 bg-primary/10 rounded"></div>
                        </div>
                        <div className="h-28 rounded-xl bg-primary/5 p-4">
                          <div className="h-4 w-24 bg-primary/10 rounded mb-4"></div>
                          <div className="h-6 w-32 bg-primary/20 rounded mb-2"></div>
                          <div className="h-3 w-20 bg-primary/10 rounded"></div>
                        </div>
                        <div className="h-28 rounded-xl bg-primary/5 p-4">
                          <div className="h-4 w-24 bg-primary/10 rounded mb-4"></div>
                          <div className="h-6 w-32 bg-primary/20 rounded mb-2"></div>
                          <div className="h-3 w-20 bg-primary/10 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <div className="h-64 rounded-xl bg-primary/5 p-4">
                            <div className="h-4 w-24 bg-primary/10 rounded mb-4"></div>
                            <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5 rounded"></div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="h-64 rounded-xl bg-primary/5 p-4">
                            <div className="h-4 w-24 bg-primary/10 rounded mb-4"></div>
                            <div className="space-y-3">
                              <div className="h-12 bg-card rounded-lg p-2 flex items-center">
                                <div className="h-8 w-8 rounded-full bg-primary/20 mr-2"></div>
                                <div className="flex-1">
                                  <div className="h-3 w-16 bg-primary/20 rounded mb-1"></div>
                                  <div className="h-2 w-24 bg-primary/10 rounded"></div>
                                </div>
                              </div>
                              <div className="h-12 bg-card rounded-lg p-2 flex items-center">
                                <div className="h-8 w-8 rounded-full bg-primary/20 mr-2"></div>
                                <div className="flex-1">
                                  <div className="h-3 w-16 bg-primary/20 rounded mb-1"></div>
                                  <div className="h-2 w-24 bg-primary/10 rounded"></div>
                                </div>
                              </div>
                              <div className="h-12 bg-card rounded-lg p-2 flex items-center">
                                <div className="h-8 w-8 rounded-full bg-primary/20 mr-2"></div>
                                <div className="flex-1">
                                  <div className="h-3 w-16 bg-primary/20 rounded mb-1"></div>
                                  <div className="h-2 w-24 bg-primary/10 rounded"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your business finances, all in one place.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border shadow-subtle hover-lift"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold">Finesse</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Finesse. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
        <path d="M9 21L9 9" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Dashboard Analytics",
    description: "Get a comprehensive overview of your financial health with customizable dashboards and real-time insights."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 6L3 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 12L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 18L3 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Transaction Management",
    description: "Easily record, categorize, and track all your financial transactions in one secure place."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13C17.7699 3.58317 19.0078 5.1773 19.0078 7.005C19.0078 8.8327 17.7699 10.4268 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Contact Management",
    description: "Maintain a comprehensive database of your customers, suppliers, and other business contacts."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Financial Reporting",
    description: "Generate comprehensive reports on profit and loss, balance sheets, cash flow, and more."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Expense Tracking",
    description: "Categorize and monitor expenses to improve budgeting and identify cost-saving opportunities."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Invoice Generation",
    description: "Create professional invoices and manage payments with automated reminders and tracking."
  },
];

export default Index;
