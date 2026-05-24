'use client';

import { StaffAddButton } from '@/components/commonLayout/admin/components/global/StaffAddButton';
import { StaffManagementColumns } from '@/components/reUseAbleComponents/columns/StaffManagementColumns';
import { DataTable } from '@/components/reUseAbleComponents/DataTable';
import { StatsCard } from '@/components/reUseAbleComponents/StatCard';
import { useGetAllStaffQuery } from '@/redux/api/staff.api';
import { IStaff } from '@/types/staff';

function PendingRequestsDashboardContent() {
  const { data, isLoading, isError } = useGetAllStaffQuery({});
  const staffList: IStaff[] = data?.data || [];

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center text-red-500">
        Failed to load staff data. Please try again.
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Staff"
          value={String(staffList.length)}
          iconName={'Users'}
          className="text-foreground flex"
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />

        <StatsCard
          title="Available"
          value={String(
            staffList.filter((s) => s.status === 'Available').length,
          )}
          iconName={'UserCheck'}
          className="text-foreground flex"
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />

        <StatsCard
          title="Unavailable"
          value={String(
            staffList.filter((s) => s.status !== 'Available').length,
          )}
          iconName={'UserX'}
          className="text-foreground flex"
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />
      </div>

      <StaffAddButton />

      <DataTable
        columns={StaffManagementColumns}
        data={staffList}
        isLoading={isLoading}
        title="Staff List"
        description="All registered healthcare professionals and support staff"
        className="max-w-full p-10"
      />
    </section>
  );
}

const StaffManagementPage = () => {
  return (
    <section>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Staff Management
          </h1>
          <p className="text-muted-foreground">
            Manage healthcare professionals and support staff
          </p>
        </div>

        <PendingRequestsDashboardContent />
      </div>
    </section>
  );
};

export default StaffManagementPage;
