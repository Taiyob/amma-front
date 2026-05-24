'use client';
import TodaySchedule from '@/components/commonLayout/staff/TodaySchedule/TodaySchedule';
import { StatsCard } from '@/components/reUseAbleComponents/StatCard';
import { useStaffDashboardSummaryQuery } from '@/redux/api/staff.api';
import { DashboardSkeleton } from '@/Skeleton/DashboardSkeleton';

const StaffDashboardContent = () => {
  const { data, isLoading } = useStaffDashboardSummaryQuery({});
  // Extract values with fallback
  if (isLoading) {
    return <DashboardSkeleton />;
  }
  console.log('Staff Dashboard Summary Data:', data);
  const todayScheduled = data?.data?.todayScheduled ?? 0;
  const thisMonthCompleted = data?.data?.thisMonthCompleted ?? 0;
  const totalCompleted = data?.data?.totalCompleted ?? 0;

  console.log(
    todayScheduled,
    thisMonthCompleted,
    totalCompleted,
    'extracted values',
  );

  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Today's Appointments"
          value={`${todayScheduled} Scheduled`}
          iconName={'Activity'}
          className="text-foreground py-8 flex border font-medium "
          iconClassName="bg-muted text-foreground"
          iconColorClassName="text-secondary"
        />
        <StatsCard
          title="Cases This Month"
          value={`${thisMonthCompleted} Completed`}
          iconName={'Users'}
          className="text-foreground flex py-8  border "
          iconClassName="bg-muted text-foreground"
          iconColorClassName="text-secondary"
        />
        <StatsCard
          title="My Assignments"
          value={`${totalCompleted} Completed`}
          className="text-foreground flex  py-8  "
          iconClassName="bg-muted text-foreground"
          iconColorClassName="text-secondary"
          iconName="CheckCircle2"
        />
      </div>
      <TodaySchedule />
    </div>
  );
};

const StaffDashboard = () => {
  return (
    <div>
      <StaffDashboardContent />
    </div>
  );
};

export default StaffDashboard;
