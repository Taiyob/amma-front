'use client';

import RecentRequestsSectionUserData from '@/components/reUseAbleComponents/columns/Action/RecentRequestsSectionUserData';
import {StatsCard} from '@/components/reUseAbleComponents/StatCard';
import {useGetAdminStatsQuery} from '@/redux/api/log';
import {DashboardSkeleton} from '@/Skeleton/DashboardSkeleton';
import {Suspense} from 'react';

function PendingRequestsDashboardContent() {
  const {data, isLoading} = useGetAdminStatsQuery({});

  // Extract data with fallback values
  const cards = data?.data?.cards || {};
  const stats = {
    pending: cards.pendingRequest || 0,
    urgent: cards.urgentCare || 0,
    dueToday: cards.dueToday || 0,
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <section className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Pending Request"
          value={stats.pending?.toString() || '0'}
          iconName={'ClipboardClockIcon'}
          className="text-foreground flex  "
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />
        <StatsCard
          title="Urgent Care"
          value={stats.urgent?.toString() || '0'}
          iconName={'Activity'}
          className="text-foreground flex "
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />
        <StatsCard
          title="Due Today"
          value={stats.dueToday?.toString() || '0'}
          iconName={'Calendar'}
          className="text-foreground flex "
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />
      </div>
      <RecentRequestsSectionUserData />
    </section>
  );
}

const PendingRequestsManagement = () => {
  return (
    <section>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Pending Requests
          </h1>
          <p>New Service request awaiting staff assignment</p>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <PendingRequestsDashboardContent />
        </Suspense>
      </div>
    </section>
  );
};
export default PendingRequestsManagement;
