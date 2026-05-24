// app/admin/dashboard/page.tsx

import { MedicationsCard } from '@/components/commonLayout/patient/components/card/MedicationsCard';
import { DashboardSkeleton } from '@/Skeleton/DashboardSkeleton';
import { Suspense } from 'react';

async function MedicationsDashboardContent() {
  return (
    <div className="space-y-10">
      <MedicationsCard />
    </div>
  );
}

const MedicationsDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight"> Medications</h1>
        <p>View details about medications</p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <MedicationsDashboardContent />
      </Suspense>
    </div>
  );
};

export default MedicationsDashboardPage;
