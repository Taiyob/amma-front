'use client';

import {DocumentsTabContent} from '@/components/commonLayout/patient/components/tabAndStep/MedicalRecordsTabContent/DocumentsTabContent';
import {MedicationsTabContent2} from '@/components/commonLayout/patient/components/tabAndStep/MedicalRecordsTabContent/MedicationsTabContent2';
import {OverviewTabContentCare} from '@/components/commonLayout/patient/components/tabAndStep/MedicalRecordsTabContent/OverviewTabContentCare';
import AppButton from '@/components/ui/AppButton';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useGetSingleCareRequestQuery} from '@/redux/api/care.api';
import {useAppSelector} from '@/redux/hooks';
import {ArrowLeft} from 'lucide-react';
import {useParams, useRouter} from 'next/navigation';

const CareHistoryDetails = () => {
  const user = useAppSelector((state) => state.auth.user);
  const params = useParams();
  const router = useRouter();

  const {data, isLoading} = useGetSingleCareRequestQuery(params.id, {
    skip: !params.id,
  });

  const careRequest = data?.data;

  const role = user?.role;
  const formatDate = (date: string) =>
    date
      ? new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'N/A';

  const isReadOnly = role !== 'ADMIN' && role !== 'STAFF';

  return (
    <div>
      <AppButton
        label="Go back"
        icon={<ArrowLeft className="w-4 h-4" />}
        className="mb-2"
        onClick={() => router.back()}
        bgColor="bg-secondary hover:bg-secondary "
        textColor="text-background"
      />

      <p className="mb-6 text-muted-foreground">
        Care Request - {formatDate(careRequest?.scheduledDate)} -{' '}
        {careRequest?.symptomsDescription || 'N/A'}
      </p>

      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1" className="cursor-pointer">
            Overview
          </TabsTrigger>
          <TabsTrigger value="tab-4" className="cursor-pointer">
            Documents
          </TabsTrigger>
          <TabsTrigger value="tab-3" className="cursor-pointer">
            Medications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tab-1">
          <OverviewTabContentCare
            visit={careRequest}
            loading={isLoading}
            isReadOnly={isReadOnly}
          />
        </TabsContent>

        <TabsContent value="tab-4">
          <DocumentsTabContent
            bookingId={careRequest?.id}
            patientId={careRequest?.patientId}
            documents={careRequest?.medicalRecords}
            visitDate={careRequest?.scheduledDate}
            visitPurpose={careRequest?.symptomsDescription}
            isReadOnly={isReadOnly}
          />
        </TabsContent>

        <TabsContent value="tab-3">
          <MedicationsTabContent2
            medications={careRequest?.medications}
            bookingId={careRequest?.id}
            patientId={careRequest?.patientId}
            isLoading={isLoading}
            isReadOnly={isReadOnly}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareHistoryDetails;
