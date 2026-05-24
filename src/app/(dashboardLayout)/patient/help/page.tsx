import HelpChatBot from '@/components/commonLayout/patient/components/chat/HelpChatBot';
import {DashboardSkeleton} from '@/Skeleton/DashboardSkeleton';
import {Suspense} from 'react';

async function HelpDashboardContent() {
  return (
    <div className="space-y-10">
      <HelpChatBot />
    </div>
  );
}

const MedicationsDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight"> Support & Chat</h1>
        <p>Get help from our support team</p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <HelpDashboardContent />
      </Suspense>
    </div>
  );
};

export default MedicationsDashboardPage;
