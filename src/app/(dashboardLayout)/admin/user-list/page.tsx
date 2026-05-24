'use client';

import UserListTable from '@/components/reUseAbleComponents/columns/Action/UserListTable';
import {StatsCard} from '@/components/reUseAbleComponents/StatCard';
import {useGetAdminStatsQuery} from '@/redux/api/log';
import {useGetAllUserQuery} from '@/redux/api/user.api';
import {DashboardSkeleton} from '@/Skeleton/DashboardSkeleton';
import {Suspense} from 'react';

function UserVerificationDashboardContent() {
  const {data: adminStats} = useGetAdminStatsQuery({});
  const {data: userData} = useGetAllUserQuery({limit: 999});

  const activeUsersCount = adminStats?.data?.cards?.activeUsers || 0;
  const totalUsersCount = userData?.data?.users?.length || 0;

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <StatsCard
          title="All Users"
          value={totalUsersCount.toString()}
          iconName={'Users'}
          className="text-foreground flex py-8"
          iconClassName="bg-muted text-foreground"
          iconColorClassName="text-secondary"
        />

        <StatsCard
          title="Active Users"
          value={activeUsersCount.toString()}
          iconName={'Activity'}
          className="text-foreground flex py-8"
          iconClassName="bg-muted text-foreground"
          iconColorClassName="text-secondary"
        />
      </div>
      <UserListTable />
    </section>
  );
}

const UserVerificationManagement = () => {
  return (
    <section>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User List</h1>
          <p>Review and verify new user registrations</p>
        </div>

        {/* Note: Suspense may not catch client-side fetching boundaries correctly here, 
            but keeping structure as requested */}
        <Suspense fallback={<DashboardSkeleton />}>
          <UserVerificationDashboardContent />
        </Suspense>
      </div>
    </section>
  );
};
export default UserVerificationManagement;
