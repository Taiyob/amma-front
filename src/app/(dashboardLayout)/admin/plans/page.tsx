'use client';

import PlansManagement from '@/components/commonLayout/admin/components/global/PlansManagement';

export default function AdminPlansPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Subscription Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure and manage your service subscription plans.
        </p>
      </div>

      <PlansManagement />
    </div>
  );
}
