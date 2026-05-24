'use client';

import {ServiceAddButton} from '@/components/commonLayout/admin/components/global/ServiceAddButton';
import {ServiceColumns} from '@/components/reUseAbleComponents/columns/ServiceColumns';
import {DataTable} from '@/components/reUseAbleComponents/DataTable';
import {StatsCard} from '@/components/reUseAbleComponents/StatCard';
import {useGetAllServiceQuery} from '@/redux/api/services.api';
import {Service} from '@/types/service.type';

function ServiceDashboardContent() {
  const {data, isLoading, isError} = useGetAllServiceQuery({});
  const serviceList: Service[] = data?.data || [];

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center text-red-500">
        Failed to load services data. Please try again.
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Services"
          value={String(serviceList.length)}
          iconName={'Activity'}
          className="text-foreground flex"
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />

        <StatsCard
          title="Active"
          value={String(serviceList.filter((s) => s.isActive).length)}
          iconName={'CheckCircle2'}
          className="text-foreground flex"
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />

        <StatsCard
          title="Inactive"
          value={String(serviceList.filter((s) => !s.isActive).length)}
          iconName={'XCircle'}
          className="text-foreground flex"
          iconClassName="bg-muted"
          iconColorClassName="text-secondary"
        />
      </div>

      <ServiceAddButton />

      <DataTable
        columns={ServiceColumns}
        data={serviceList}
        isLoading={isLoading}
        title="Service List"
        description="All registered holistic healthcare services and packages"
        className="max-w-full p-10"
      />
    </section>
  );
}

const ServiceManagementPage = () => {
  return (
    <section>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Service Management
          </h1>
          <p className="text-muted-foreground">
            Manage your service offerings, packages, and pricing
          </p>
        </div>

        <ServiceDashboardContent />
      </div>
    </section>
  );
};

export default ServiceManagementPage;
