'use client';

import ActiveCasesTab from '@/components/commonLayout/admin/ActiveServiceCard/ActiveCasesTab';
import { StatsCard } from '@/components/reUseAbleComponents/StatCard';
import { DashboardSkeleton } from '@/Skeleton/DashboardSkeleton';
import { Suspense } from 'react';
import { useGetAdminStatsQuery } from '@/redux/api/log';

function ActiveCasesDashboardContent() {
  const { data } = useGetAdminStatsQuery({});
  const cards = data?.data?.cards || {};

  return (
    <section className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="In Progress"
          value={cards?.inProgress?.toString() || '0'}
          iconName={'Activity'}
          className="text-foreground flex  "
          iconClassName="bg-muted text-foreground"
          iconColorClassName="text-secondary"
        />
        <StatsCard
          title="Completed"
          value={cards?.completed?.toString() || '0'} // Fallback to inProgress if traveling not explicitly returned
          iconName={'MapPin'}
          className=" flex text-foreground  "
          iconClassName="bg-muted text-foreground"
          iconColorClassName="text-secondary"
        />

        <StatsCard
          title="Staff Active"
          value={cards?.staffActive?.toString() || '0'}
          iconName={'User'}
          className="text-foreground flex "
          iconClassName="bg-muted text-foreground"
          iconColorClassName="text-secondary"
        />
      </div>
      <ActiveCasesTab />
    </section>
  );
}

const PendingRequestsManagement = () => {
  return (
    <section>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Emma!</h1>
          <p>Real-time updates on ongoing service visits</p>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <ActiveCasesDashboardContent />
        </Suspense>
      </div>
    </section>
  );
};
export default PendingRequestsManagement;
