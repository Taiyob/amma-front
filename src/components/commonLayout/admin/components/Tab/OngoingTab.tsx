/* eslint-disable @typescript-eslint/no-explicit-any */
import {ActiveVisitItem} from '@/components/commonLayout/admin/ActiveServiceCard/OngoingServiceCard';
import {useGetOngoingCareRequestQuery} from '@/redux/api/care.api';
import {Loader2} from 'lucide-react';

export const OngoingTab = () => {
  const {data, isLoading} = useGetOngoingCareRequestQuery({});
  const ongoingRequests = data?.data?.data || [];

  console.log('[ongoingRequests]', data);

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-secondary" />
      </div>
    );
  }

  if (ongoingRequests.length === 0) {
    return (
      <div className="text-center p-10 text-muted-foreground border rounded-xl mt-4 bg-muted/20">
        No ongoing care requests found.
      </div>
    );
  }

  return (
    <div>
      {ongoingRequests.map((request: any) => {
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
