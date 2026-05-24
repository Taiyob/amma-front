'use client';

import { DocumentsTabContent } from '@/components/commonLayout/patient/components/tabAndStep/MedicalRecordsTabContent/DocumentsTabContent';
import { MedicationsTabContent2 } from '@/components/commonLayout/patient/components/tabAndStep/MedicalRecordsTabContent/MedicationsTabContent2';
import { OverviewTabContent } from '@/components/commonLayout/patient/components/tabAndStep/MedicalRecordsTabContent/OverviewTabContent';
import AppButton from '@/components/ui/AppButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetSinglePatientVisitQuery } from '@/redux/api/visit.api';
import { useAppSelector } from '@/redux/hooks';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

const MedicalRecordsDetails = () => {
  const user = useAppSelector((state) => state.auth.user);
  const params = useParams();

  const { data, isLoading } = useGetSinglePatientVisitQuery(params.id, {
    skip: !params.id,
  });

  const visit = data?.data;

  const role = user?.role;

  let backUrl = '/login';

  switch (role) {
    case 'ADMIN':
      backUrl = '/admin/active-cases';
      break;
    case 'PATIENT':
      backUrl = '/patient/medical-records';
      break;
    case 'STAFF':
      backUrl = '/staff/dashboard';
      break;
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div>
      <AppButton
        label="Go back"
        icon={<ArrowLeft className="w-4 h-4" />}
        className="mb-2"
        href={backUrl}
        bgColor="bg-secondary hover:bg-secondary "
        textColor="text-background"
      />

      <p className="mb-6 text-muted-foreground">
        Visit - {formatDate(visit?.visitDate)} - {visit?.visitPurpose}
      </p>

      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Overview</TabsTrigger>
          <TabsTrigger value="tab-4">Documents</TabsTrigger>
          <TabsTrigger value="tab-3">Medications</TabsTrigger>
        </TabsList>

        <TabsContent value="tab-1">
          <OverviewTabContent visit={visit} loading={isLoading} />
        </TabsContent>

        <TabsContent value="tab-4">
          <DocumentsTabContent
            visitId={visit?.id}
            patientId={visit?.patientId}
            documents={visit?.documents}
            visitDate={visit?.visitDate}
            visitPurpose={visit?.visitPurpose}
          />
        </TabsContent>

        <TabsContent value="tab-3">
          <MedicationsTabContent2
            medications={visit?.medications}
            visitId={visit?.id}
            patientId={visit?.patientId}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecordsDetails;
