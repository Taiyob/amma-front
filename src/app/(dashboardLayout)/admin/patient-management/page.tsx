/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SearchPatient from '@/components/commonLayout/admin/SearchPatient/SearchPatient';
import { PatientManagementColumn } from '@/components/reUseAbleComponents/columns/PatientManagement';
import { DataTable } from '@/components/reUseAbleComponents/DataTable';
import { StatsCard } from '@/components/reUseAbleComponents/StatCard';
import { useGetSearchPatientsQuery } from '@/redux/api/patient.api';
import { useState } from 'react';

export default function PendingRequestsManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  // API call with search query
  const { data, isLoading } = useGetSearchPatientsQuery(
    searchQuery ? { search: searchQuery } : {},
  );

  console.log('datataaaaaaa', data);

  // Map API response to DataTable structure
  const patients =
    data?.data?.patients?.slice(0, 10).map((p: any) => ({
      id: p.id,
      patient: p.name,
      age: p.age ?? '—',
      phoneNumber: p.phone ?? p.user?.phone ?? '—',
      userId: p.user?.id || '76e50f81-65af-446f-9b8e-0c093db27b91',
      familyMember: p.user?.name ?? '—',
      familyPhone: p.user?.phone ?? '—',
      date: p.lastVisit
        ? new Date(p.lastVisit).toLocaleDateString()
        : 'Not Visited',
      time: p.lastVisit ? new Date(p.lastVisit).toLocaleTimeString() : '',
      relation: p?.relation, // Optional if available
      avatarUrl: p?.profilephoto, // Optional if available
      status: p.status?.toLowerCase() ?? 'active',
    })) ?? [];

  return (
    <section className="space-y-10">
      <SearchPatient
        onSearch={(val) => setSearchQuery(val)}
        totalPatients={patients.length}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <StatsCard
          title="Active Users"
          value={patients
            .filter((p: any) => p.status === 'active')
            .length.toString()}
          className="text-foreground flex"
          iconClassName="bg-muted text-secondary"
        />
        <StatsCard
          title="Inactive Users"
          value={patients
            .filter((p: any) => p.status !== 'active')
            .length.toString()}
          className="text-foreground flex"
          iconClassName="bg-muted text-secondary"
        />
      </div>

      <DataTable
        columns={PatientManagementColumn}
        data={patients}
        title="Patient Records"
        description="Showing search results for patients"
        className="max-w-full"
        isLoading={isLoading}
      />
    </section>
  );
}
