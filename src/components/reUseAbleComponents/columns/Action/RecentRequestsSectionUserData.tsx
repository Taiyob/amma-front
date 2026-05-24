/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {requestColumns} from '@/components/reUseAbleComponents/columns/requestColumns';
import {DataTable} from '@/components/reUseAbleComponents/DataTable';
import AssignStaffModal from '@/components/commonLayout/admin/model/AssignStaffModal';
import AppButton from '@/components/ui/AppButton';

import {useGetPendingCareRequestQuery} from '@/redux/api/care.api';

export default function RecentRequestsSectionUserData() {
  const limit = 99;
  const {data, isLoading} = useGetPendingCareRequestQuery({limit});
  const requests = data?.data?.data || [];

  console.log('[requests]', data);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const router = useRouter();

  // Handle row click → navigate to details
  const handleRowClick = (row: any) => {
    router.push(`/shared/user-profile/${row.patient?.id}`);
  };

  // Enhanced columns with Assign Staff button
  const columnsWithAction = requestColumns.map((col) => {
    if (col.key === 'action') {
      return {
        ...col,
        render: (_: any, row: any) => (
          <div onClick={(e) => e.stopPropagation()}>
            <AppButton
              // icon={
              //   <>
              //     <Plus className='w-4 h-4' />
              //   </>
              // }
              label="Assign Staff"
              className="flex items-center text-xs gap-2 bg-muted px-3! py-0 rounded-md hover:bg-muted transition-colors"
              onClick={() => {
                setSelectedBookingId(row.id);
                setIsAssignModalOpen(true);
              }}
              bgColor="bg-secondary hover:bg-secondary/80"
              hoverBgColor="bg-muted "
              textColor="text-background "
            />
          </div>
        ),
      };
    }
    return col;
  });

  return (
    <>
      <DataTable
        columns={columnsWithAction}
        data={requests}
        isLoading={isLoading}
        title="Recent Requests"
        description="Latest service requests (showing pending & assigned)"
        className="max-w-full p-10"
        onRowClick={handleRowClick} // 👈 Enable row navigation
      />
      <AssignStaffModal
        open={isAssignModalOpen}
        setOpen={setIsAssignModalOpen}
        bookingId={selectedBookingId}
      />
    </>
  );
}
