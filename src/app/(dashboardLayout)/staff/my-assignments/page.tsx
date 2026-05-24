/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CompletedCheckupCard from '@/components/commonLayout/staff/card/CompletedCheckupCard';
import OngoingAppointmentCard from '@/components/commonLayout/staff/card/OngoingAppointmentCard';
import {StatsCard} from '@/components/reUseAbleComponents/StatCard';
import {useGetMyAssignTaskQuery} from '@/redux/api/staff.api';
import {DashboardSkeleton} from '@/Skeleton/DashboardSkeleton';
import {Suspense} from 'react';

function StaffMyAssignmentsContent() {
  // Fetch ongoing assignments
  const {data: ongoingData, isLoading: ongoingLoading} =
    useGetMyAssignTaskQuery('ongoing'); // or whatever status value your backend expects

  // Fetch completed assignments
  const {data: completedData, isLoading: completedLoading} =
    useGetMyAssignTaskQuery('completed');

  console.log('Ongoing Data:', ongoingData);
  console.log('Completed Data:', completedData);
  if (completedLoading || ongoingLoading) {
    return <DashboardSkeleton />;
  }

  const ongoingAssignments = Array.isArray(ongoingData?.data?.assignments)
    ? ongoingData.data.assignments
    : [];

  const completedAssignments = Array.isArray(completedData?.data?.assignments)
    ? completedData.data.assignments
    : [];

  const totalOngoing = ongoingAssignments.length;
  const totalCompleted = completedAssignments.length;
  const isLoading = ongoingLoading || completedLoading;

  console.log('totalOngoing', totalOngoing);

  console.log('Ongoing Assignments:', ongoingAssignments);
  console.log('Completed Assignments:', completedAssignments);
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Ongoing Appointments"
          value={isLoading ? '...' : String(totalOngoing)}
          iconName="Calendar"
          className="border border-blue-100 shadow-sm hover:shadow transition-all"
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />

        <StatsCard
          title="Total Completed Checkups"
          value={isLoading ? '...' : String(totalCompleted)}
          iconName="CheckCircle2"
          className="border border-green-100 shadow-sm hover:shadow transition-all"
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />
      </div>
      <div>
        <h1 className="text-2xl mb-4">My Assignments</h1>

        <div className="flex flex-col gap-4">
          {ongoingAssignments?.length > 0 ? (
            ongoingAssignments.map((assignment: any) => (
              <OngoingAppointmentCard
                key={assignment?.id}
                appointmentType={assignment?.booking?.serviceName}
                patientName={assignment?.booking?.patient?.guardianName}
                patientLocation={assignment?.booking?.address || 'N/A'}
                date={new Date(
                  assignment?.booking?.scheduledDate,
                ).toDateString()}
                time={assignment?.booking?.preferredTime}
                patientContact={assignment?.booking?.patient?.phone}
                familyMemberName={assignment?.booking?.patient?.name}
                familyMemberRelation={
                  assignment?.booking?.patient?.relationship
                }
                familyMemberLocation=""
                patientId={assignment?.booking?.patient?.id}
                patient={assignment?.booking?.patient}
                vitals={assignment?.booking?.vitals}
                assignmentId={assignment?.booking?.id}
                completedId={assignment?.id}
                status={assignment?.status}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-32 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground text-sm">
                No ongoing appointments available
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-2xl mb-4">Completed Checkups</h1>

        {completedAssignments?.length > 0 ? (
          completedAssignments.map((checkup: any) => (
            <CompletedCheckupCard
              key={checkup?.id}
              checkupType={checkup?.booking?.serviceName}
              patientName={checkup?.booking?.patient?.guardianName}
              patientRelation={checkup?.booking?.patient?.relationship}
              patientAge={0}
              completedDate={
                checkup?.completedAt
                  ? new Date(checkup.completedAt).toLocaleDateString()
                  : 'N/A'
              }
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-32 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground text-sm">
              No completed checkups available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyAssignmentsDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-6 lg:py-10">
      <Suspense fallback={<DashboardSkeleton />}>
        <StaffMyAssignmentsContent />
      </Suspense>
    </div>
  );
}
