// components/UserListTable.tsx
'use client';

import {useRouter} from 'next/navigation';
import {DataTable} from '@/components/reUseAbleComponents/DataTable';
import {UserListColumn} from '@/components/reUseAbleComponents/columns/UserListColumn';
import {useGetAllUserQuery} from '@/redux/api/user.api';
import {IUser} from '@/types/user';

export default function UserListTable() {
  const router = useRouter();
  const {data, isLoading, isError} = useGetAllUserQuery({limit: 999});
  const users = data?.data?.users || [];

  const handleRowClick = (row: IUser) => {
    // Navigate to user details page
    router.push(`/admin/user-list/${row.id}`);
  };

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center text-red-500">
        Failed to load users. Please try again later.
      </div>
    );
  }

  return (
    <DataTable
      columns={UserListColumn}
      data={users}
      isLoading={isLoading}
      title=""
      description=""
      className="max-w-full p-0"
      onRowClick={handleRowClick}
    />
  );
}
