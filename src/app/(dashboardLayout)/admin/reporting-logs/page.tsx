import ReportingLogsPage from '@/components/commonLayout/admin/ReportingLogsForm/ReportingLogsPage';
import { DashboardSkeleton } from '@/Skeleton/DashboardSkeleton';
import { Suspense } from 'react';

async function PatientManagementDashboardContent() {
  return (
    <section className="space-y-10">
      {/* <ReportingLogsForm/> */}
      <ReportingLogsPage />
    </section>
  );
}

const UserVerificationManagement = () => {
  return (
    <section>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reporting & Logs
          </h1>
          <p>Upload and publish medical reports to patient dashboards</p>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <PatientManagementDashboardContent />
        </Suspense>
      </div>
    </section>
  );
};
export default UserVerificationManagement;
