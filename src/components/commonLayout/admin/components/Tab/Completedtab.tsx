/* eslint-disable @typescript-eslint/no-explicit-any */
import {CompletedItem} from '../../ActiveServiceCard/CompletedItems';
import {useGetCompletedCareRequestQuery} from '@/redux/api/care.api';
import {Loader2} from 'lucide-react';

export const CompletedTab = () => {
  const {data, isLoading} = useGetCompletedCareRequestQuery({});
  const completedRequests = data?.data?.data || [];

  console.log('[completedRequests]', completedRequests);

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-secondary" />
      </div>
    );
  }

  if (completedRequests.length === 0) {
    return (
      <div className="text-center p-10 text-muted-foreground border rounded-xl mt-4 bg-muted/20">
        No completed care requests found.
      </div>
    );
  }

  return (
    <div>
      {completedRequests.map((request: any) => {
        const visitData = {
          id: request.id,
          service: request.bookingItems?.[0]?.service?.name || 'N/A',
          status: request.status,
          patientName: request.patient?.name || 'N/A',
          patientRelation: request.patient?.relationship || 'N/A',
          location: `${request.address?.area}, ${request.address?.city}`,
          staffName: request.assignment?.staff?.user?.displayName || 'N/A',
          staffContact: request.assignment?.staff?.contactNumber || '-',
          startedTime: request.scheduledDate
            ? new Date(request.scheduledDate).toLocaleDateString()
            : 'N/A',
        };

        return (
          <CompletedItem key={request.id} visit={visitData} className=" " />
        );
      })}
    </div>
  );
};
