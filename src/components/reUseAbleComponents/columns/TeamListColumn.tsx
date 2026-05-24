'use client';

import { Column } from '@/components/reUseAbleComponents/DataTable';
import { ITeamMember } from '@/types/team.type';
import Image from 'next/image';
import { TeamAction } from './TeamAction';


export const TeamListColumn: Column<ITeamMember>[] = [
  {
    key: 'serial',
    label: '#',
    className: 'w-12 md:w-16 font-medium',
    render: (_, __, index) => index + 1,
  },
  {
    key: 'image',
    label: 'Image',
    className: 'w-20',
    render: (image, row) => (
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={row.name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-xs text-gray-400">No Image</div>
        )}
      </div>
    ),
  },
  {
    key: 'name',
    label: 'Name',
    className: 'font-medium',
    render: (name) => name || '—',
  },
  {
    key: 'designation',
    label: 'Designation',
    className: '',
    render: (designation) => designation || '—',
  },
  {
    key: 'email',
    label: 'Email',
    className: '',
    render: (email) => email || '—',
  },
  {
    key: 'contact',
    label: 'Contact',
    className: '',
    render: (contact) => contact || '—',
  },
  {
    key: 'action',
    label: 'Action',
    className: 'text-right',
    render: (_, row) => (
      <div onClick={(e) => e.stopPropagation()} data-prevent-row-click>
        <TeamAction team={row} />
      </div>
    ),
  },
];
