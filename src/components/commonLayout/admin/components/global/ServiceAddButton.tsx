'use client';

import AppButton from '@/components/ui/AppButton';
import { useState } from 'react';
import ServiceModal from './ServiceModal';
import { Plus } from 'lucide-react';

export const ServiceAddButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AppButton
        label="Add New Service"
        icon={<Plus />}
        onClick={() => setOpen(true)}
        bgColor="bg-secondary hover:bg-secondary "
        textColor="text-background"
        hoverBgColor=""
      />
      {/* The modal itself */}
      <ServiceModal open={open} setOpen={setOpen} />
    </div>
  );
};
