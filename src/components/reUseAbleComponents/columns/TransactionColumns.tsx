'use client';

import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Column } from '@/components/reUseAbleComponents/DataTable';

export type Transaction = {
  id: string;
  amount: number;
  status: string;
  method: string;
  reference: string;
  type: string;
  createdAt: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  subscription?: {
    plan?: {
      name: string;
    };
  };
  metadata?: {
    plan?: {
      id?: number;
      name?: string;
      interval?: string;
    };
    metadata?: {
      type?: string;
      bookingId?: string;
      referrer?: string;
    };
  };
  booking?: any;
};

const planMap: Record<string, string> = {
  Starter: 'Bronze',
  Business: 'Silver',
  Enterprise: 'Gold',
};

const getPlanDisplay = (row: Transaction) => {
  // Check deep metadata type for care requests
  const metaType = row.metadata?.metadata?.type;
  if (metaType === 'care_request') {
    return 'Care Request';
  }

  // Fallback to subscription plan mapping
  const rawName = row.subscription?.plan?.name || row.metadata?.plan?.name || 'N/A';
  const translatedName = planMap[rawName] || rawName;
  const interval = row.metadata?.plan?.interval || '';

  if (interval) {
    return `${translatedName} (${interval})`;
  }
  return translatedName;
};

const getTypeDisplay = (row: Transaction) => {
  const metaType = row.metadata?.metadata?.type;
  if (metaType === 'care_request') {
    return 'Care Request';
  }
  return row.type?.toLowerCase().replace('_', ' ');
};

// Common columns for both roles
const commonColumns: Column<Transaction>[] = [
  {
    key: 'sl',
    label: 'S/L',
    render: (_, __, index) => <span>{index + 1}</span>,
  },
  {
    key: 'type',
    label: 'Type',
    render: (_, row) => (
      <Badge variant="outline" className="capitalize">
        {getTypeDisplay(row)}
      </Badge>
    ),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (_, row) => (
      <span className="font-semibold text-secondary">${row.amount.toFixed(2)}</span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (_, row) => (
      <Badge
        className={cn(
          'capitalize font-medium',
          row.status === 'paid' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
            row.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
              'bg-rose-100 text-rose-700 border-rose-200'
        )}
        variant="outline"
      >
        {row.status}
      </Badge>
    ),
  },
  {
    key: 'method',
    label: 'Method',
    render: (_, row) => <span className="capitalize">{row.method}</span>,
  },
  {
    key: 'plan',
    label: 'Plan',
    render: (_, row) => (
      <span className="capitalize font-medium">{getPlanDisplay(row)}</span>
    ),
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: (_, row) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.createdAt), 'MMM dd, yyyy HH:mm')}
      </span>
    ),
  },
  {
    key: 'reference',
    label: 'Reference',
    render: (_, row) => <span className="font-mono text-xs">{row.reference}</span>,
  },
];

// Specialized columns for Patient View
export const PatientTransactionColumns: Column<Transaction>[] = [...commonColumns];

// Specialized columns for Admin View (includes User column)
export const AdminTransactionColumns: Column<Transaction>[] = [
  {
    key: 'sl',
    label: 'S/L',
    render: (_, __, index) => <span>{index + 1}</span>,
  },
  {
    key: 'user',
    label: 'Customer',
    render: (_, row) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">
          {row.user ? `${row.user.firstName} ${row.user.lastName}` : 'System User'}
        </span>
        <span className="text-xs text-muted-foreground">{row.user?.email || 'N/A'}</span>
      </div>
    ),
  },
  ...commonColumns.filter(c => c.key !== 'sl'),
];

// Default export for backward compatibility or general use
export const TransactionColumns = PatientTransactionColumns;
