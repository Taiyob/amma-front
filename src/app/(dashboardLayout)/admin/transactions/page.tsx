'use client';

import { useGetAdminTransactionsQuery } from '@/redux/api/transactions.api';
import { DataTable } from '@/components/reUseAbleComponents/DataTable';
import { AdminTransactionColumns } from '@/components/reUseAbleComponents/columns/TransactionColumns';
import { StatsCard } from '@/components/reUseAbleComponents/StatCard';
import { CreditCard, DollarSign, Clock, AlertTriangle } from 'lucide-react';

export default function AdminTransactionsPage() {
  const { data, isLoading, isError } = useGetAdminTransactionsQuery({});
  const transactions = data?.data || [];

  // Calculate some stats
  const totalAmount = transactions.reduce((acc: number, curr: any) => acc + curr.amount, 0);
  const paidCount = transactions.filter((t: any) => t.status === 'paid').length;
  const pendingCount = transactions.filter((t: any) => t.status === 'pending').length;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertTriangle className="h-12 w-12 text-rose-500" />
        <p className="text-muted-foreground font-medium">Failed to load transactions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Transaction Management</h1>
        <p className="text-muted-foreground mt-1 text-base">
          Monitor and manage all financial records across the platform.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Volume"
          value={`$${totalAmount.toLocaleString()}`}
          iconName="DollarSign"
          className="text-foreground flex"
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />
        <StatsCard
          title="Paid Transactions"
          value={String(paidCount)}
          iconName="CreditCard"
          className="text-foreground flex"
          iconClassName="bg-muted"
          iconColorClassName="text-emerald-500"
        />
        <StatsCard
          title="Pending"
          value={String(pendingCount)}
          iconName="Clock"
          className="text-foreground flex"
          iconClassName="bg-muted"
          iconColorClassName="text-amber-500"
        />
      </div>

      {/* Grid List Table */}
      <DataTable
        columns={AdminTransactionColumns}
        data={transactions}
        isLoading={isLoading}
        title="All Transactions"
        description="Detailed record of all system payments, subscriptions, and care requests."
        className="max-w-full "
      />
    </div>
  );
}
