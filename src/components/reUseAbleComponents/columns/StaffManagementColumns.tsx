'use client';

import { Badge } from '@/components/ui/badge';
import { Column } from '@/components/reUseAbleComponents/DataTable';
import { IStaff } from '@/types/staff';

export const StaffManagementColumns: Column<IStaff>[] = [
    {
        key: 'staffId',
        label: 'Staff ID',
        className: 'font-mono text-sm w-28',
        render: (_, row) => (
            <span className="text-muted-foreground">{row.staffId}</span>
        ),
    },
    {
        key: 'name',
        label: 'Name',
        className: 'min-w-[180px]',
        render: (_, row) => (
            <div className="font-medium leading-tight py-1">{row.name}</div>
        ),
    },
    {
        key: 'email',
        label: 'Email',
        className: 'min-w-[200px]',
        render: (_, row) => (
            <span className="text-sm text-muted-foreground">{row.email}</span>
        ),
    },
    {
        key: 'contact',
        label: 'Contact',
        className: 'min-w-[140px]',
        render: (_, row) => (
            <span className="text-sm whitespace-nowrap">{row.contact}</span>
        ),
    },
    {
        key: 'assignedCount' as unknown as keyof IStaff,
        label: 'Current Care',
        className: 'w-24 text-center',
        render: (_, row) => (
            <div className="flex justify-center w-full">
                <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm">
                    {row.assignedCount || 0}
                </span>
            </div>
        ),
    },
    {
        key: 'status',
        label: 'Status',
        className: 'w-28 text-center',
        render: (_, row) => (
            <Badge
                className={`font-medium ${row.status === 'Available'
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : 'bg-amber-100 text-amber-700 border-amber-200'
                    }`}
                variant="outline">
                {row.status}
            </Badge>
        ),
    },

];