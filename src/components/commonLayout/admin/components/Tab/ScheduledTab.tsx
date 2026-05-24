/* eslint-disable @typescript-eslint/no-explicit-any */
import {ActiveVisitItem} from '@/components/commonLayout/admin/ActiveServiceCard/OngoingServiceCard';
import {useGetScheduledCareRequestQuery} from '@/redux/api/care.api';
import {Loader2} from 'lucide-react';

export const ScheduledTab = () => {
  const {data, isLoading} = useGetScheduledCareRequestQuery({});
  const scheduledRequests = data?.data?.data || [];

  console.log('[scheduledRequests]', data);

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-secondary" />
      </div>
    );
  }

  if (scheduledRequests.length === 0) {
    return (
      <div className="text-center p-10 text-muted-foreground border rounded-xl mt-4 bg-muted/20">
        No scheduled care requests found.
      </div>
    );
  }

  return (
    <div>
      {scheduledRequests.map((request: any) => {
        const visitData = {
          id: request.id,
          service: request.bookingItems?.[0]?.service?.name || 'N/A',
          status: request.status,
          patientName: request.patient?.name || 'N/A',
          patientRelation: request.patient?.relationship || 'N/A',
          location: `${request.address?.area}, ${request.address?.city}`,
          staffName:
            request.assignment?.staff?.user?.displayName || 'Unassigned',
          staffContact: request.assignment?.staff?.contactNumber || '-',
          startedTime: request.scheduledDate
            ? new Date(request.scheduledDate).toLocaleDateString()
            : 'N/A',
        };

        return (
          <ActiveVisitItem
            key={request.id}
            visit={visitData}
            className="border-secondary"
          />
        );
      })}
    </div>
  );
};
