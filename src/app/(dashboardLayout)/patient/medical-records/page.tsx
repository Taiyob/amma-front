import {NextAppointmentAndVisitHistoryCard} from '@/components/commonLayout/patient/components/card/NextAppointmentAndVisithistoryCard';
import CreateVisitModal from '@/components/commonLayout/patient/components/model/CreateVisitModal';
import {AIMedicalRecordsQuery} from '@/components/reUseAbleComponents/AIMedicalRecordsQuery';
import {DashboardSkeleton} from '@/Skeleton/DashboardSkeleton';
import {Suspense} from 'react';

async function MedicalRecordsDashboardContent() {
  return (
    <section className="space-y-10">
      <AIMedicalRecordsQuery />
      <NextAppointmentAndVisitHistoryCard />
    </section>
  );
}

const UserVerificationManagement = () => {
  return (
    <section>
      <div className="space-y-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Medical Records
            </h1>
          </div>
          <CreateVisitModal />
        </div>
        <Suspense fallback={<DashboardSkeleton />}>
          <MedicalRecordsDashboardContent />
        </Suspense>
      </div>
    </section>
  );
};
export default UserVerificationManagement;
