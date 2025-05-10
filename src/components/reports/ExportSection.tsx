
import React, { useState } from 'react';
import { Calendar } from '../../components/ui/calendar';
import { Button } from '../../components/ui/button';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';

const ExportSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Export Reports</h2>
      <p className="mb-8">
        Generate and download reports in various formats for your
        accounting needs.
      </p>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Date Range</h3>
        <div className="flex items-center space-x-4">
          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
          <p>Select Date Range:</p>
          <div className="relative">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            {date ? (
              <p className="font-medium mt-2">
                {format(date, 'PPP')}
              </p>
            ) : (
              <p className="text-muted-foreground mt-2">
                Click to select a date
              </p>
            )}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Report Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p>Generate Sales Report (CSV)</p>
            <Button variant="outline">
              Download <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p>Generate Financial Statement (PDF)</p>
            <Button variant="outline">
              Download <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExportSection;
