
import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/transitions/PageTransition';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex">
      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </div>
      
      <div className="hidden lg:block lg:w-1/2 h-screen bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-1000"></div>
        </div>
        
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="rounded-2xl glass-card shadow-subtle p-8 overflow-hidden">
            <motion.div 
              className="relative z-10 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-4 bg-primary/10 rounded-md w-3/4 mx-auto"></div>
                <div className="h-4 bg-primary/10 rounded-md w-5/6 mx-auto"></div>
                <div className="h-4 bg-primary/10 rounded-md w-4/6 mx-auto"></div>
              </div>
              
              <div className="mt-10 flex justify-center space-x-2">
                <div className="w-12 h-12 rounded-lg bg-primary/20"></div>
                <div className="w-12 h-12 rounded-lg bg-primary/15"></div>
                <div className="w-12 h-12 rounded-lg bg-primary/10"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
