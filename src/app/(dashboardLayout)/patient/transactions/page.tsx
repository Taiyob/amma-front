'use client';

import { useGetUserTransactionsQuery } from '@/redux/api/transactions.api';
import { DataTable } from '@/components/reUseAbleComponents/DataTable';
import { PatientTransactionColumns } from '@/components/reUseAbleComponents/columns/TransactionColumns';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function PatientTransactionsPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetUserTransactionsQuery({});
  const transactions = data?.data || [];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertCircle className="h-12 w-12 text-rose-500" />
        <p className="text-muted-foreground font-medium">Failed to load your transactions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Back Button & Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="group mb-2 -ml-2 text-muted-foreground hover:text-secondary p-0 px-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Billing
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Transaction History</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">
            View all your past payments and subscription records.
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <DataTable
        columns={PatientTransactionColumns}
        data={transactions}
        isLoading={isLoading}
        title="My Transactions"
        description="A complete list of your subscription payments and service charges."
        className="max-w-full "
      />
    </div>
  );
}
