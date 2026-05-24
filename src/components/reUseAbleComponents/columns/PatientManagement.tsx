/* eslint-disable @next/next/no-img-element */
'use client';
import {Button} from '@/components/ui/button';
import {Column} from '@/components/reUseAbleComponents/DataTable';
import type {Request} from '@/types/request';
import {User} from 'lucide-react';
import AppButton from '@/components/ui/AppButton';

export const PatientManagementColumn: Column<Request>[] = [
  {
    key: 'avatar',
    label: 'Patient',
    className: 'py-3',
    render: (_, row) => (
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 w- rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {row.avatarUrl ? (
            <img
              src={row.avatarUrl}
              alt={row.patient}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-gray-500" />
          )}
        </div>
        <div>
          <div className="font-medium">{row.patient}</div>
          <div className="text-xs text-muted-foreground">
            {row.age} years old
          </div>
          {/* <div className="text-xs text-muted-foreground mt-1">
            {row.relation} • {row.location}
          </div> */}
        </div>
      </div>
    ),
  },
  {
    key: 'contact',
    label: 'Contact',
    className: 'py-3',
    render: (_, row) => (
      <div className="space-y-1">
        <div>{row.phoneNumber || '—'}</div>
      </div>
    ),
  },
  {
    key: 'familyMember',
    label: 'Family Member',
    className: 'py-3',
    render: (_, row) => (
      <div>
        <div className="font-medium">{row.familyMember || '—'}</div>
        <div className="text-xs text-muted-foreground">
          {row.familyPhone || '—'}
        </div>
      </div>
    ),
  },
  {
    key: 'date',
    label: 'Last Visited',
    className: ' py-3',
    render: (_, row) => <div className="text-sm">{row.date}</div>,
  },
  {
    key: 'status',
    label: 'Status',
    className: 'py-3',
    render: (_, row) => (
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-1 ${
          row.status === 'active'
            ? 'bg-green-100 text-green-800 hover:bg-green-200'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}>
        {row.status === 'active' ? 'Active' : 'Inactive'}
      </Button>
    ),
  },
  {
    key: 'action',
    label: 'Action',
    className: 'w-32 py-3',
    render: (_, row) => (
      <AppButton
        label="View"
        className="bg-secondary"
        href={`/admin/user-list/${row?.userId}`}
        bgColor="bg-secondary hover:bg-secondary"
        textColor="text-background"
      />
    ),
  },
];
