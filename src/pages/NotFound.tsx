
import React from 'react';
import { Button } from '../components/ui/button';

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="text-center space-y-5">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="text-2xl font-medium">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <div className="pt-5">
          <a href="/">
            <Button>Go Back Home</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
