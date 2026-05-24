import {DocumentsTabContent} from '@/components/commonLayout/patient/components/tabAndStep/MedicalRecordsTabContent/DocumentsTabContent';
import {LabTabContent} from '@/components/commonLayout/patient/components/tabAndStep/MedicalRecordsTabContent/LabTabContent';
import {OverviewTabContent} from '@/components/commonLayout/patient/components/tabAndStep/MedicalRecordsTabContent/OverviewTabContent';
import AppButton from '@/components/ui/AppButton';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ArrowLeft} from 'lucide-react';
const MedicalRecordsDetails = () => {
  return (
    <div>
      <div>
        <AppButton
          label="Go back"
          icon={<ArrowLeft className="w-4 h-4" />}
          className="mb-4"
          href="/patient/medical-records"
        />
      </div>
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Overview</TabsTrigger>
          <TabsTrigger value="tab-2">Lab</TabsTrigger>
          {/* <TabsTrigger value="tab-3">Medications</TabsTrigger> */}
          <TabsTrigger value="tab-4">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <OverviewTabContent />
        </TabsContent>
        <TabsContent value="tab-2">
          <LabTabContent />
        </TabsContent>
        {/* <TabsContent value="tab-3">
                <MedicationsTabContent/>
            </TabsContent> */}
        <TabsContent value="tab-4">
          <DocumentsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default MedicalRecordsDetails;
