'use client';

import { DataTable } from '@/components/reUseAbleComponents/DataTable';
import { TeamListColumn } from '@/components/reUseAbleComponents/columns/TeamListColumn';
import { useGetAllTeamsQuery } from '@/redux/api/team.api';

export default function TeamListTable() {
  const { data, isLoading, isError } = useGetAllTeamsQuery({});
  const teams = data?.data || [];

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center text-red-500">
        Failed to load team members. Please try again later.
      </div>
    );
  }

  return (
    <DataTable
      columns={TeamListColumn}
      data={teams}
      isLoading={isLoading}
      title=""
      description=""
      className="max-w-full p-0"
    />
  );
}
