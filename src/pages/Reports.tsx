
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText, Download, Printer, Calendar, FileSpreadsheet, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { contentVariants } from '@/components/transitions/PageTransition';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Reports = () => {
  const [periodTab, setPeriodTab] = useState('thisMonth');
  const [activeReport, setActiveReport] = useState<string | null>(null);
  
  const reportTypes = [
    {
      id: 'profit-loss',
      title: 'Profit & Loss',
      description: 'Summary of revenues, costs, and expenses',
      icon: <BarChart3 className="h-8 w-8 text-primary/70" />
    },
    {
      id: 'balance-sheet',
      title: 'Balance Sheet',
      description: 'Assets, liabilities and equity snapshot',
      icon: <svg className="h-8 w-8 text-primary/70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    },
    {
      id: 'cash-flow',
      title: 'Cash Flow',
      description: 'Money movement in and out of your business',
      icon: <svg className="h-8 w-8 text-primary/70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20"/>
        <path d="M5 20V8.2a1 1 0 0 1 .4-.8l10.5-7.2a1 1 0 0 1 1.1 0l4.9 3.3a1 1 0 0 1 0 1.7l-10.5 7.2a1 1 0 0 1-1 0l-5.1-3.5"/>
      </svg>
    },
    {
      id: 'tax-summary',
      title: 'Tax Summary',
      description: 'Sales tax collected and paid',
      icon: <FileText className="h-8 w-8 text-primary/70" />
    },
    {
      id: 'expense-report',
      title: 'Expense Report',
      description: 'Detailed breakdown of all expenses',
      icon: <svg className="h-8 w-8 text-primary/70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
        <path d="M16 3v10"/>
      </svg>
    },
    {
      id: 'accounts-aging',
      title: 'Accounts Aging',
      description: 'Monitor overdue receivables and payables',
      icon: <Calendar className="h-8 w-8 text-primary/70" />
    },
  ];
  
  // Generate PDF content with proper report format
  const generatePDFReport = (reportId: string, reportTitle: string): string => {
    // Simulate report generation delay
    toast.loading(`Generating ${reportTitle} report...`);
    
    // Create content based on report type
    let tableContent = '';
    let additionalContent = '';
    
    if (reportId === 'profit-loss') {
      tableContent = `
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-header">
              <td colspan="3"><strong>Revenue</strong></td>
            </tr>
            <tr>
              <td>Sales Revenue</td>
              <td>$125,000.00</td>
              <td>85%</td>
            </tr>
            <tr>
              <td>Service Revenue</td>
              <td>$22,500.00</td>
              <td>15%</td>
            </tr>
            <tr class="subtotal">
              <td>Total Revenue</td>
              <td>$147,500.00</td>
              <td>100%</td>
            </tr>
            <tr class="section-header">
              <td colspan="3"><strong>Expenses</strong></td>
            </tr>
            <tr>
              <td>Cost of Goods Sold</td>
              <td>$65,000.00</td>
              <td>44%</td>
            </tr>
            <tr>
              <td>Salaries</td>
              <td>$35,000.00</td>
              <td>24%</td>
            </tr>
            <tr>
              <td>Rent</td>
              <td>$8,500.00</td>
              <td>6%</td>
            </tr>
            <tr>
              <td>Utilities</td>
              <td>$3,200.00</td>
              <td>2%</td>
            </tr>
            <tr>
              <td>Insurance</td>
              <td>$2,500.00</td>
              <td>1.7%</td>
            </tr>
            <tr class="subtotal">
              <td>Total Expenses</td>
              <td>$114,200.00</td>
              <td>77.7%</td>
            </tr>
            <tr class="total">
              <td>Net Profit</td>
              <td>$33,300.00</td>
              <td>22.3%</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (reportId === 'balance-sheet') {
      tableContent = `
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-header">
              <td colspan="2"><strong>Assets</strong></td>
            </tr>
            <tr class="subsection">
              <td colspan="2">Current Assets</td>
            </tr>
            <tr>
              <td>Cash</td>
              <td>$45,000.00</td>
            </tr>
            <tr>
              <td>Accounts Receivable</td>
              <td>$32,500.00</td>
            </tr>
            <tr>
              <td>Inventory</td>
              <td>$75,000.00</td>
            </tr>
            <tr class="subsection">
              <td colspan="2">Fixed Assets</td>
            </tr>
            <tr>
              <td>Equipment</td>
              <td>$125,000.00</td>
            </tr>
            <tr>
              <td>Building</td>
              <td>$350,000.00</td>
            </tr>
            <tr>
              <td>Less: Accumulated Depreciation</td>
              <td>($85,000.00)</td>
            </tr>
            <tr class="subtotal">
              <td>Total Assets</td>
              <td>$542,500.00</td>
            </tr>
            <tr class="section-header">
              <td colspan="2"><strong>Liabilities & Equity</strong></td>
            </tr>
            <tr class="subsection">
              <td colspan="2">Current Liabilities</td>
            </tr>
            <tr>
              <td>Accounts Payable</td>
              <td>$28,500.00</td>
            </tr>
            <tr>
              <td>Short-term Loans</td>
              <td>$15,000.00</td>
            </tr>
            <tr class="subsection">
              <td colspan="2">Long-term Liabilities</td>
            </tr>
            <tr>
              <td>Mortgage</td>
              <td>$275,000.00</td>
            </tr>
            <tr class="subsection">
              <td colspan="2">Equity</td>
            </tr>
            <tr>
              <td>Owner's Capital</td>
              <td>$190,000.00</td>
            </tr>
            <tr>
              <td>Retained Earnings</td>
              <td>$34,000.00</td>
            </tr>
            <tr class="subtotal">
              <td>Total Liabilities & Equity</td>
              <td>$542,500.00</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (reportId === 'cash-flow') {
      tableContent = `
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-header">
              <td colspan="2"><strong>Operating Activities</strong></td>
            </tr>
            <tr>
              <td>Net Income</td>
              <td>$33,300.00</td>
            </tr>
            <tr>
              <td>Depreciation</td>
              <td>$12,500.00</td>
            </tr>
            <tr>
              <td>Increase in Accounts Receivable</td>
              <td>($5,200.00)</td>
            </tr>
            <tr>
              <td>Decrease in Inventory</td>
              <td>$8,300.00</td>
            </tr>
            <tr>
              <td>Increase in Accounts Payable</td>
              <td>$3,700.00</td>
            </tr>
            <tr class="subtotal">
              <td>Net Cash from Operating Activities</td>
              <td>$52,600.00</td>
            </tr>
            <tr class="section-header">
              <td colspan="2"><strong>Investing Activities</strong></td>
            </tr>
            <tr>
              <td>Purchase of Equipment</td>
              <td>($18,500.00)</td>
            </tr>
            <tr class="subtotal">
              <td>Net Cash from Investing Activities</td>
              <td>($18,500.00)</td>
            </tr>
            <tr class="section-header">
              <td colspan="2"><strong>Financing Activities</strong></td>
            </tr>
            <tr>
              <td>Loan Repayment</td>
              <td>($12,000.00)</td>
            </tr>
            <tr>
              <td>Owner's Withdrawals</td>
              <td>($15,000.00)</td>
            </tr>
            <tr class="subtotal">
              <td>Net Cash from Financing Activities</td>
              <td>($27,000.00)</td>
            </tr>
            <tr class="total">
              <td>Net Increase in Cash</td>
              <td>$7,100.00</td>
            </tr>
            <tr>
              <td>Cash at Beginning of Period</td>
              <td>$37,900.00</td>
            </tr>
            <tr class="total">
              <td>Cash at End of Period</td>
              <td>$45,000.00</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (reportId === 'tax-summary') {
      tableContent = `
        <table>
          <thead>
            <tr>
              <th>Tax Type</th>
              <th>Taxable Amount</th>
              <th>Tax Rate</th>
              <th>Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-header">
              <td colspan="4"><strong>Sales Tax Collected</strong></td>
            </tr>
            <tr>
              <td>State Sales Tax</td>
              <td>$125,000.00</td>
              <td>6.25%</td>
              <td>$7,812.50</td>
            </tr>
            <tr>
              <td>Local Sales Tax</td>
              <td>$125,000.00</td>
              <td>2.00%</td>
              <td>$2,500.00</td>
            </tr>
            <tr class="subtotal">
              <td colspan="3">Total Sales Tax Collected</td>
              <td>$10,312.50</td>
            </tr>
            <tr class="section-header">
              <td colspan="4"><strong>Sales Tax Paid</strong></td>
            </tr>
            <tr>
              <td>State Sales Tax</td>
              <td>$65,000.00</td>
              <td>6.25%</td>
              <td>$4,062.50</td>
            </tr>
            <tr>
              <td>Local Sales Tax</td>
              <td>$65,000.00</td>
              <td>2.00%</td>
              <td>$1,300.00</td>
            </tr>
            <tr class="subtotal">
              <td colspan="3">Total Sales Tax Paid</td>
              <td>$5,362.50</td>
            </tr>
            <tr class="total">
              <td colspan="3">Net Sales Tax Due</td>
              <td>$4,950.00</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (reportId === 'expense-report') {
      tableContent = `
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-01-05</td>
              <td>Rent</td>
              <td>ABC Properties</td>
              <td>Office rent January</td>
              <td>$2,850.00</td>
            </tr>
            <tr>
              <td>2023-01-08</td>
              <td>Utilities</td>
              <td>City Power</td>
              <td>Electricity bill</td>
              <td>$750.00</td>
            </tr>
            <tr>
              <td>2023-01-10</td>
              <td>Office Supplies</td>
              <td>Office Depot</td>
              <td>Printer paper, ink cartridges</td>
              <td>$325.00</td>
            </tr>
            <tr>
              <td>2023-01-15</td>
              <td>Salaries</td>
              <td>Payroll</td>
              <td>Bi-weekly payroll</td>
              <td>$12,500.00</td>
            </tr>
            <tr>
              <td>2023-01-18</td>
              <td>Marketing</td>
              <td>FB Ads</td>
              <td>Social media campaign</td>
              <td>$1,250.00</td>
            </tr>
            <tr>
              <td>2023-01-20</td>
              <td>Insurance</td>
              <td>Safety First</td>
              <td>Property insurance</td>
              <td>$850.00</td>
            </tr>
            <tr>
              <td>2023-01-25</td>
              <td>Utilities</td>
              <td>WaterWorks</td>
              <td>Water bill</td>
              <td>$180.00</td>
            </tr>
            <tr>
              <td>2023-01-28</td>
              <td>Equipment</td>
              <td>Tech Solutions</td>
              <td>New laptop</td>
              <td>$1,200.00</td>
            </tr>
            <tr class="total">
              <td colspan="4">Total Expenses</td>
              <td>$19,905.00</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (reportId === 'accounts-aging') {
      tableContent = `
        <table>
          <thead>
            <tr>
              <th>Customer/Vendor</th>
              <th>Current</th>
              <th>1-30 Days</th>
              <th>31-60 Days</th>
              <th>61-90 Days</th>
              <th>90+ Days</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-header">
              <td colspan="7"><strong>Accounts Receivable</strong></td>
            </tr>
            <tr>
              <td>ABC Corp</td>
              <td>$5,200.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$5,200.00</td>
            </tr>
            <tr>
              <td>Johnson LLC</td>
              <td>$2,800.00</td>
              <td>$3,500.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$6,300.00</td>
            </tr>
            <tr>
              <td>Smith Enterprises</td>
              <td>$0.00</td>
              <td>$4,500.00</td>
              <td>$2,800.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$7,300.00</td>
            </tr>
            <tr>
              <td>XYZ Industries</td>
              <td>$1,500.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$3,200.00</td>
              <td>$0.00</td>
              <td>$4,700.00</td>
            </tr>
            <tr>
              <td>Global Tech</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$2,500.00</td>
              <td>$6,500.00</td>
              <td>$9,000.00</td>
            </tr>
            <tr class="subtotal">
              <td>Total Receivables</td>
              <td>$9,500.00</td>
              <td>$8,000.00</td>
              <td>$2,800.00</td>
              <td>$5,700.00</td>
              <td>$6,500.00</td>
              <td>$32,500.00</td>
            </tr>
            <tr class="section-header">
              <td colspan="7"><strong>Accounts Payable</strong></td>
            </tr>
            <tr>
              <td>Supplier Co.</td>
              <td>$8,200.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$8,200.00</td>
            </tr>
            <tr>
              <td>Parts Inc.</td>
              <td>$4,300.00</td>
              <td>$2,500.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$6,800.00</td>
            </tr>
            <tr>
              <td>Office Supply Ltd.</td>
              <td>$0.00</td>
              <td>$3,200.00</td>
              <td>$2,300.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$5,500.00</td>
            </tr>
            <tr>
              <td>Tech Distributors</td>
              <td>$5,000.00</td>
              <td>$0.00</td>
              <td>$0.00</td>
              <td>$3,000.00</td>
              <td>$0.00</td>
              <td>$8,000.00</td>
            </tr>
            <tr class="subtotal">
              <td>Total Payables</td>
              <td>$17,500.00</td>
              <td>$5,700.00</td>
              <td>$2,300.00</td>
              <td>$3,000.00</td>
              <td>$0.00</td>
              <td>$28,500.00</td>
            </tr>
          </tbody>
        </table>
      `;
    }
    
    // Add chart placeholder for relevant reports
    if (['profit-loss', 'cash-flow'].includes(reportId)) {
      additionalContent = `
        <div class="chart-placeholder">
          <p>Chart visualization would appear here in a real report</p>
          <div class="chart-image"></div>
        </div>
      `;
    }
    
    // Create a document with styling
    const dummyContent = `
      <html>
        <head>
          <title>${reportTitle} Report</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 30px;
              color: #333;
            }
            h1 { 
              color: #2563eb; 
              border-bottom: 2px solid #2563eb;
              padding-bottom: 10px;
            }
            h2 {
              color: #4b5563;
              margin-top: 20px;
            }
            .report-header { 
              padding-bottom: 20px; 
              margin-bottom: 20px;
            }
            .report-date { 
              color: #6b7280; 
              font-size: 14px;
            }
            .company-info {
              margin-bottom: 30px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0;
              font-size: 14px;
            }
            th, td { 
              border: 1px solid #e5e7eb; 
              padding: 10px 12px; 
              text-align: left; 
            }
            th { 
              background-color: #f3f4f6;
              font-weight: bold;
            }
            .section-header td {
              background-color: #f8fafc;
              font-weight: bold;
              color: #1e40af;
            }
            .subsection td {
              background-color: #f1f5f9;
              font-style: italic;
            }
            .subtotal td {
              border-top: 2px solid #94a3b8;
              font-weight: bold;
              background-color: #f1f5f9;
            }
            .total td {
              border-top: 2px solid #64748b;
              border-bottom: 2px solid #64748b;
              font-weight: bold;
              background-color: #e0e7ff;
            }
            .chart-placeholder {
              margin: 30px 0;
              border: 1px dashed #94a3b8;
              padding: 20px;
              text-align: center;
              background-color: #f8fafc;
            }
            .chart-image {
              height: 200px;
              background-color: #e0e7ff;
              border-radius: 8px;
              margin-top: 10px;
            }
            .page-number {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #94a3b8;
            }
            .footer {
              margin-top: 40px;
              font-size: 12px;
              color: #94a3b8;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h1>${reportTitle} Report</h1>
            <div class="company-info">
              <p><strong>Finesse Financial</strong></p>
              <p>123 Business Avenue, Suite 500</p>
              <p>New York, NY 10001</p>
            </div>
            <p class="report-date">Period: ${
              periodTab === 'thisMonth' ? 'Current Month (January 2023)' : 
              periodTab === 'lastMonth' ? 'Last Month (December 2022)' : 
              periodTab === 'quarter' ? 'Current Quarter (Q1 2023)' : 'Current Year (2023)'
            }</p>
            <p class="report-date">Generated on: ${new Date().toLocaleDateString('en-US', {
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          ${tableContent}
          
          ${additionalContent}
          
          <div class="page-number">Page 1 of 1</div>
          
          <div class="footer">
            This document is for informational purposes only.
          </div>
        </body>
      </html>
    `;
    
    // Create a Blob and download
    const blob = new Blob([dummyContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    setTimeout(() => {
      toast.dismiss();
      toast.success(`${reportTitle} report generated successfully`);
    }, 1500);
    
    return url;
  };
  
  // Generate Excel file with proper formatting
  const generateExcelReport = (reportId: string, reportTitle: string): string => {
    toast.loading(`Generating ${reportTitle} Excel report...`);
    
    // Create headers and rows based on report type
    let headers: string[] = [];
    let rows: string[][] = [];
    
    if (reportId === 'profit-loss') {
      headers = ['Category', 'Amount', 'Percentage'];
      rows = [
        ['Revenue', '', ''],
        ['Sales Revenue', '$125,000.00', '85%'],
        ['Service Revenue', '$22,500.00', '15%'],
        ['Total Revenue', '$147,500.00', '100%'],
        ['Expenses', '', ''],
        ['Cost of Goods Sold', '$65,000.00', '44%'],
        ['Salaries', '$35,000.00', '24%'],
        ['Rent', '$8,500.00', '6%'],
        ['Utilities', '$3,200.00', '2%'],
        ['Insurance', '$2,500.00', '1.7%'],
        ['Total Expenses', '$114,200.00', '77.7%'],
        ['Net Profit', '$33,300.00', '22.3%']
      ];
    } else if (reportId === 'balance-sheet') {
      headers = ['Account', 'Amount'];
      rows = [
        ['Assets', ''],
        ['Current Assets', ''],
        ['Cash', '$45,000.00'],
        ['Accounts Receivable', '$32,500.00'],
        ['Inventory', '$75,000.00'],
        ['Fixed Assets', ''],
        ['Equipment', '$125,000.00'],
        ['Building', '$350,000.00'],
        ['Less: Accumulated Depreciation', '($85,000.00)'],
        ['Total Assets', '$542,500.00'],
        ['Liabilities & Equity', ''],
        ['Current Liabilities', ''],
        ['Accounts Payable', '$28,500.00'],
        ['Short-term Loans', '$15,000.00'],
        ['Long-term Liabilities', ''],
        ['Mortgage', '$275,000.00'],
        ['Equity', ''],
        ['Owner\'s Capital', '$190,000.00'],
        ['Retained Earnings', '$34,000.00'],
        ['Total Liabilities & Equity', '$542,500.00']
      ];
    } else if (reportId === 'cash-flow') {
      headers = ['Category', 'Amount'];
      rows = [
        ['Operating Activities', ''],
        ['Net Income', '$33,300.00'],
        ['Depreciation', '$12,500.00'],
        ['Increase in Accounts Receivable', '($5,200.00)'],
        ['Decrease in Inventory', '$8,300.00'],
        ['Increase in Accounts Payable', '$3,700.00'],
        ['Net Cash from Operating Activities', '$52,600.00'],
        ['Investing Activities', ''],
        ['Purchase of Equipment', '($18,500.00)'],
        ['Net Cash from Investing Activities', '($18,500.00)'],
        ['Financing Activities', ''],
        ['Loan Repayment', '($12,000.00)'],
        ['Owner\'s Withdrawals', '($15,000.00)'],
        ['Net Cash from Financing Activities', '($27,000.00)'],
        ['Net Increase in Cash', '$7,100.00'],
        ['Cash at Beginning of Period', '$37,900.00'],
        ['Cash at End of Period', '$45,000.00']
      ];
    } else if (reportId === 'tax-summary') {
      headers = ['Tax Type', 'Taxable Amount', 'Tax Rate', 'Tax Amount'];
      rows = [
        ['Sales Tax Collected', '', '', ''],
        ['State Sales Tax', '$125,000.00', '6.25%', '$7,812.50'],
        ['Local Sales Tax', '$125,000.00', '2.00%', '$2,500.00'],
        ['Total Sales Tax Collected', '', '', '$10,312.50'],
        ['Sales Tax Paid', '', '', ''],
        ['State Sales Tax', '$65,000.00', '6.25%', '$4,062.50'],
        ['Local Sales Tax', '$65,000.00', '2.00%', '$1,300.00'],
        ['Total Sales Tax Paid', '', '', '$5,362.50'],
        ['Net Sales Tax Due', '', '', '$4,950.00']
      ];
    } else if (reportId === 'expense-report') {
      headers = ['Date', 'Category', 'Vendor', 'Description', 'Amount'];
      rows = [
        ['2023-01-05', 'Rent', 'ABC Properties', 'Office rent January', '$2,850.00'],
        ['2023-01-08', 'Utilities', 'City Power', 'Electricity bill', '$750.00'],
        ['2023-01-10', 'Office Supplies', 'Office Depot', 'Printer paper, ink cartridges', '$325.00'],
        ['2023-01-15', 'Salaries', 'Payroll', 'Bi-weekly payroll', '$12,500.00'],
        ['2023-01-18', 'Marketing', 'FB Ads', 'Social media campaign', '$1,250.00'],
        ['2023-01-20', 'Insurance', 'Safety First', 'Property insurance', '$850.00'],
        ['2023-01-25', 'Utilities', 'WaterWorks', 'Water bill', '$180.00'],
        ['2023-01-28', 'Equipment', 'Tech Solutions', 'New laptop', '$1,200.00'],
        ['', '', '', 'Total Expenses', '$19,905.00']
      ];
    } else if (reportId === 'accounts-aging') {
      headers = ['Customer/Vendor', 'Current', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days', 'Total'];
      rows = [
        ['Accounts Receivable', '', '', '', '', '', ''],
        ['ABC Corp', '$5,200.00', '$0.00', '$0.00', '$0.00', '$0.00', '$5,200.00'],
        ['Johnson LLC', '$2,800.00', '$3,500.00', '$0.00', '$0.00', '$0.00', '$6,300.00'],
        ['Smith Enterprises', '$0.00', '$4,500.00', '$2,800.00', '$0.00', '$0.00', '$7,300.00'],
        ['XYZ Industries', '$1,500.00', '$0.00', '$0.00', '$3,200.00', '$0.00', '$4,700.00'],
        ['Global Tech', '$0.00', '$0.00', '$0.00', '$2,500.00', '$6,500.00', '$9,000.00'],
        ['Total Receivables', '$9,500.00', '$8,000.00', '$2,800.00', '$5,700.00', '$6,500.00', '$32,500.00'],
        ['Accounts Payable', '', '', '', '', '', ''],
        ['Supplier Co.', '$8,200.00', '$0.00', '$0.00', '$0.00', '$0.00', '$8,200.00'],
        ['Parts Inc.', '$4,300.00', '$2,500.00', '$0.00', '$0.00', '$0.00', '$6,800.00'],
        ['Office Supply Ltd.', '$0.00', '$3,200.00', '$2,300.00', '$0.00', '$0.00', '$5,500.00'],
        ['Tech Distributors', '$5,000.00', '$0.00', '$0.00', '$3,000.00', '$0.00', '$8,000.00'],
        ['Total Payables', '$17,500.00', '$5,700.00', '$2,300.00', '$3,000.00', '$0.00', '$28,500.00']
      ];
    }
    
    // Add period data to the top
    const periodRow = [
      `Period: ${
        periodTab === 'thisMonth' ? 'Current Month (January 2023)' : 
        periodTab === 'lastMonth' ? 'Last Month (December 2022)' : 
        periodTab === 'quarter' ? 'Current Quarter (Q1 2023)' : 'Current Year (2023)'
      }`
    ];
    
    const titleRow = [`${reportTitle} Report`];
    const emptyRow = [''];
    const dateRow = [`Generated: ${new Date().toLocaleDateString()}`];
    
    // Create a simple CSV string as Excel content
    const csvContent = [
      titleRow.join(','),
      periodRow.join(','),
      dateRow.join(','),
      emptyRow.join(','),
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create a Blob and get URL
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    setTimeout(() => {
      toast.dismiss();
      toast.success(`${reportTitle} Excel report generated successfully`);
    }, 1500);
    
    return url;
  };
  
  const handleDownloadPDF = (reportId: string, reportTitle: string) => {
    const url = generatePDFReport(reportId, reportTitle);
    
    setTimeout(() => {
      // Create an anchor element to download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportId}-report.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1600);
  };
  
  const handleDownloadExcel = (reportId: string, reportTitle: string) => {
    const url = generateExcelReport(reportId, reportTitle);
    
    setTimeout(() => {
      // Create an anchor element to download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportId}-report.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1600);
  };
  
  const handlePrint = (reportId: string, reportTitle: string) => {
    const url = generatePDFReport(reportId, reportTitle);
    
    setTimeout(() => {
      // Open in a new window and print
      const printWindow = window.open(url, '_blank');
      
      if (printWindow) {
        printWindow.onload = function() {
          printWindow.print();
        };
      } else {
        toast.error('Please allow popups to print reports');
      }
    }, 1600);
  };
  
  const handleViewReport = (reportId: string, reportTitle: string) => {
    setActiveReport(reportId);
    const url = generatePDFReport(reportId, reportTitle);
    
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1600);
  };
  
  // Function to get report content for preview
  const getReportPreview = (reportId: string) => {
    if (reportId === 'profit-loss') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="font-medium bg-muted/50">
              <TableCell colSpan={3}>Revenue</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sales Revenue</TableCell>
              <TableCell>$125,000.00</TableCell>
              <TableCell>85%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Service Revenue</TableCell>
              <TableCell>$22,500.00</TableCell>
              <TableCell>15%</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>Total Revenue</TableCell>
              <TableCell>$147,500.00</TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
            <TableRow className="font-medium bg-muted/50">
              <TableCell colSpan={3}>Expenses</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cost of Goods Sold</TableCell>
              <TableCell>$65,000.00</TableCell>
              <TableCell>44%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Salaries</TableCell>
              <TableCell>$35,000.00</TableCell>
              <TableCell>24%</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>Total Expenses</TableCell>
              <TableCell>$114,200.00</TableCell>
              <TableCell>77.7%</TableCell>
            </TableRow>
            <TableRow className="font-medium bg-primary/10">
              <TableCell>Net Profit</TableCell>
              <TableCell>$33,300.00</TableCell>
              <TableCell>22.3%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    } else if (reportId === 'balance-sheet') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="font-medium bg-muted/50">
              <TableCell colSpan={2}>Assets</TableCell>
            </TableRow>
            <TableRow className="italic">
              <TableCell>Current Assets</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash</TableCell>
              <TableCell>$45,000.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Accounts Receivable</TableCell>
              <TableCell>$32,500.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Inventory</TableCell>
              <TableCell>$75,000.00</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>Total Assets</TableCell>
              <TableCell>$542,500.00</TableCell>
            </TableRow>
            <TableRow className="font-medium bg-muted/50">
              <TableCell colSpan={2}>Liabilities & Equity</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Accounts Payable</TableCell>
              <TableCell>$28,500.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Owner's Capital</TableCell>
              <TableCell>$190,000.00</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>Total Liabilities & Equity</TableCell>
              <TableCell>$542,500.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    } else if (reportId === 'cash-flow') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="font-medium bg-muted/50">
              <TableCell colSpan={2}>Operating Activities</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Income</TableCell>
              <TableCell>$33,300.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Depreciation</TableCell>
              <TableCell>$12,500.00</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>Net Cash from Operating Activities</TableCell>
              <TableCell>$52,600.00</TableCell>
            </TableRow>
            <TableRow className="font-medium bg-primary/10">
              <TableCell>Net Increase in Cash</TableCell>
              <TableCell>$7,100.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    } else if (reportId === 'tax-summary') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tax Type</TableHead>
              <TableHead>Taxable Amount</TableHead>
              <TableHead>Tax Rate</TableHead>
              <TableHead>Tax Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="font-medium bg-muted/50">
              <TableCell colSpan={4}>Sales Tax Collected</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>State Sales Tax</TableCell>
              <TableCell>$125,000.00</TableCell>
              <TableCell>6.25%</TableCell>
              <TableCell>$7,812.50</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell colSpan={3}>Total Sales Tax Collected</TableCell>
              <TableCell>$10,312.50</TableCell>
            </TableRow>
            <TableRow className="font-medium bg-primary/10">
              <TableCell colSpan={3}>Net Sales Tax Due</TableCell>
              <TableCell>$4,950.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    } else if (reportId === 'expense-report') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-01-05</TableCell>
              <TableCell>Rent</TableCell>
              <TableCell>$2,850.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-01-08</TableCell>
              <TableCell>Utilities</TableCell>
              <TableCell>$750.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-01-15</TableCell>
              <TableCell>Salaries</TableCell>
              <TableCell>$12,500.00</TableCell>
            </TableRow>
            <TableRow className="font-medium bg-primary/10">
              <TableCell colSpan={2}>Total Expenses</TableCell>
              <TableCell>$19,905.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    } else if (reportId === 'accounts-aging') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer/Vendor</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>1-30 Days</TableHead>
              <TableHead>90+ Days</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="font-medium bg-muted/50">
              <TableCell colSpan={5}>Accounts Receivable</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ABC Corp</TableCell>
              <TableCell>$5,200.00</TableCell>
              <TableCell>$0.00</TableCell>
              <TableCell>$0.00</TableCell>
              <TableCell>$5,200.00</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>Total Receivables</TableCell>
              <TableCell>$9,500.00</TableCell>
              <TableCell>$8,000.00</TableCell>
              <TableCell>$6,500.00</TableCell>
              <TableCell>$32,500.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    }
    
    return null;
  };
  
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Financial Reports</h1>
            
            <div className="flex items-center gap-2">
              <Tabs 
                value={periodTab} 
                onValueChange={setPeriodTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="thisMonth">This Month</TabsTrigger>
                  <TabsTrigger value="lastMonth">Last Month</TabsTrigger>
                  <TabsTrigger value="quarter">Quarter</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={contentVariants(0.1)}
            initial="initial"
            animate="animate"
          >
            {reportTypes.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.05 * index }
                }}
              >
                <Card 
                  className={`hover:border-primary/30 transition-colors cursor-pointer h-full ${
                    activeReport === report.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setActiveReport(report.id)}
                >
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3">
                      {report.icon}
                    </div>
                    <div className="space-y-1">
                      <CardTitle>{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {activeReport === report.id && (
                      <div className="mb-4 overflow-x-auto rounded-md border">
                        {getReportPreview(report.id)}
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewReport(report.id, report.title)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDownloadExcel(report.id, report.title)}
                          >
                            <FileSpreadsheet className="h-4 w-4 mr-1" />
                            Excel
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDownloadPDF(report.id, report.title)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePrint(report.id, report.title)}
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            Print
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Reports;
