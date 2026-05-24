import {Suspense} from 'react';
import {DashboardSkeleton} from '@/Skeleton/DashboardSkeleton';
import PatientProfilesPage from '@/components/commonLayout/patient/components/pages/PatientProfilesPage/PatientProfiles';

function PatientProfileContent() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Patient Profiles
          </h1>
          <p className="text-muted-foreground">
            Manage your family members and their care information
          </p>
        </div>
      </div>

      <PatientProfilesPage />
    </div>
  );
}

export default function PatientDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-6 lg:py-10">
      <Suspense fallback={<DashboardSkeleton />}>
        <PatientProfileContent />
      </Suspense>
    </div>
  );
}
