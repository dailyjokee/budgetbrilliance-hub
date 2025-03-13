
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex flex-1 bg-primary/5 items-center justify-center relative">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl"></div>
          </div>
          <div className="max-w-md p-8">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold">Finesse Finance</h2>
              <p className="text-muted-foreground mt-2">
                Simplify your business finances with our intuitive accounting platform.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Easy Accounting</h3>
                  <p className="text-sm text-muted-foreground">Manage your finances without the complexity of traditional accounting software.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">Get notified about important financial events and deadlines.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Secure Platform</h3>
                  <p className="text-sm text-muted-foreground">Your financial data is protected with enterprise-grade security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
