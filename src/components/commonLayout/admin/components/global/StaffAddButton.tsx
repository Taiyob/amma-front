'use client';

import AppButton from '@/components/ui/AppButton';
import {useState} from 'react';
import StaffModal from '../../model/StaffModal';
import {Plus} from 'lucide-react';

export const StaffAddButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AppButton
        label="Add New Staff Member"
        icon={
          <>
            <Plus />
          </>
        }
        onClick={() => setOpen(true)}
        bgColor="bg-secondary hover:bg-secondary "
        textColor="text-background"
        hoverBgColor=""
      />
      {/* The modal itself */}
      <StaffModal open={open} setOpen={setOpen} />
    </div>
  );
};
