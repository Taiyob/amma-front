'use client';

import {Column} from '@/components/reUseAbleComponents/DataTable';
import {IUser} from '@/types/user';
import {UserStatusAction} from './UserStatusAction';
import {UserRoleAction} from './UserRoleAction';
// import Image from 'next/image';
// import {User} from 'lucide-react';

export const UserListColumn: Column<IUser>[] = [
  {
    key: 'serial',
    label: '#',
    className: 'w-12 md:w-16 font-medium',
    render: (_, __, index) => index + 1,
  },
  {
    key: 'name',
    label: 'Patient',
    className: '',
    render: (_, row) => (
      <div className="space-y-0.5">
        {/* <div className="h-10 w-10 w- rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {row.avatarUrl ? (
            <Image
              src={row.avatarUrl}
              alt={row.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-gray-500" />
          )}
        </div> */}
        <div className="font-medium leading-tight">{row.name}</div>
        <div className="text-xs text-muted-foreground">{row.address}</div>
      </div>
    ),
  },

  {
    key: 'contact',
    label: 'Contact',
    className: '',
    render: (_, row) => (
      <div className="space-y-1">
        <div className="text-sm">{row.phone || '—'}</div>
        <div className="text-xs text-muted-foreground">{row.email || '—'}</div>
      </div>
    ),
  },
  {
    key: 'patientProfilesCount',
    label: 'Patients',
    className: 'text-center',
    render: (_, row) => {
      return row.patientProfilesCount?.toString() || '0';
    },
  },
  {
    key: 'joined',
    label: 'Joined',
    className: 'text-right',
    render: (_, row) =>
      row.joined ? new Date(row.joined).toLocaleDateString() : '—',
  },
  {
    key: 'role',
    label: 'Role',
    className: 'text-center',
    render: (_, row) => (
      <div onClick={(e) => e.stopPropagation()} data-prevent-row-click>
        <UserRoleAction user={row} />
      </div>
    ),
  },
  {
    key: 'action',
    label: 'Action',
    className: 'text-right',
    render: (_, row) => (
      <div onClick={(e) => e.stopPropagation()} data-prevent-row-click>
        <UserStatusAction user={row} />
      </div>
    ),
  },
  {
    key: 'address',
    label: 'Location',
    className: '',
    render: (_, row) => row.address || '—',
  },
];
