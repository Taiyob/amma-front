'use client';
/* eslint-disable react/no-unescaped-entities */
import {Suspense} from 'react';
import MedicationHealthOverview from '@/components/commonLayout/patient/MedicationHealthOverview';
import RequestCareCard from '@/components/commonLayout/patient/RequestCareCard';
import {StatsCard} from '@/components/reUseAbleComponents/StatCard';
import {DashboardSkeleton} from '@/Skeleton/DashboardSkeleton';
import {HealthTrendsTabs} from '@/components/commonLayout/patient/Tabs';

import {useAppSelector} from '@/redux/hooks';
import {useGetPatientDashboardStatsQuery} from '@/redux/api/patient.api';
import dayjs from 'dayjs';
import {useGetMeQuery} from '@/redux/api/user.api';

function PatientDashboardContent() {
  const patientId = useAppSelector((state) => state.patient.selectedPatientId);

  const {data, isLoading} = useGetPatientDashboardStatsQuery(patientId, {
    skip: !patientId,
  });

  const cards = data?.data?.cards;
  const healthTrends = data?.data?.healthTrends;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        <StatsCard
          title="Active Members"
          description={cards?.activeMembers || 'N/A'}
          iconName="Users"
          className="border border-border/60 bg-card hover:bg-accent/40 transition-colors h-full"
          iconClassName="bg-secondary/10"
          iconColorClassName="text-secondary"
          iconColorClassNameAnother="text-muted-foreground"
        />

        <StatsCard
          title="Next Appointment"
          status={
            cards?.nextAppointment?.priority !== 'NONE'
              ? cards?.nextAppointment?.priority
              : undefined
          }
          description={
            cards?.nextAppointment?.date
              ? `${dayjs(cards.nextAppointment.date).format('D MMMM, YYYY')} (${
                  cards.nextAppointment.time
                }) • ${cards.nextAppointment.doctor}`
              : cards?.nextAppointment?.doctor || 'No upcoming appointment'
          }
          iconName="Calendar"
          iconNameAnother="ChevronRight"
          href={`/patient/medical-records`}
          className="border border-border/60 bg-card hover:bg-accent/40 transition-colors h-full"
          iconClassName="bg-secondary/10"
          iconColorClassName="text-secondary"
          iconColorClassNameAnother="text-muted-foreground"
        />

        <StatsCard
          title="Last Visit"
          description={cards?.lastVisit || 'No past visits'}
          iconName="Clock"
          iconNameAnother="ChevronRight"
          href="/patient/medical-records"
          className="border border-border/60 bg-card hover:bg-accent/40 transition-colors h-full"
          iconClassName="bg-secondary/10"
          iconColorClassName="text-secondary"
          iconColorClassNameAnother="text-muted-foreground"
        />
      </div>

      {/* Request Care Card */}
      <RequestCareCard />

      {/* Medication & Health Overview */}
      <MedicationHealthOverview />
      <HealthTrendsTabs healthTrends={healthTrends} />
    </div>
  );
}

export default function PatientDashboardPage() {
  const me = useGetMeQuery({});
  console.log(me);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl capitalize">
          Welcome, {me?.data?.data?.displayName || 'User'}!
        </h1>
        <p className="mt-1.5 text-muted-foreground">
          Here's an overview of your family's health
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <PatientDashboardContent />
      </Suspense>
    </div>
  );
}
