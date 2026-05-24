/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { User, Pill, FileText, Activity } from 'lucide-react';
import { MedicationsEditTabContent } from '../components/Tab/UserEditTab/MedicationsEditTabContent';
import { UserInfoEditTab } from '../components/Tab/UserEditTab/UserInfoEditTab';
import { DocumentsEditTabContent } from '../components/Tab/UserEditTab/DocumentsEditTabContent';
import { VisitsEditTabContent } from '../components/Tab/UserEditTab/VisitsEditTabContent';
import { HealthInsightEditTabContent } from '../components/Tab/UserEditTab/HealthInsightEditTabContent';
import { IPatientProfileDetail } from '@/types/user';

interface EditPatientModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  patient?: IPatientProfileDetail | null;
}

export default function EditPatientModal({
  open,
  setOpen,
  patient,
}: EditPatientModalProps) {
  if (!patient) return null;

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 w-full max-w-4xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>
            Edit Patient Profile —{' '}
            <span className="text-muted-foreground font-normal">
              {patient.name}
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="flex flex-col h-full">
          <div className="px-6 pt-4 border-b bg-muted/40 flex">
            <ScrollArea>
              <TabsList className="bg-transparent p-0">
                <TabsTrigger value="basic">
                  <User className="h-4 w-4 mr-1" /> Basic
                </TabsTrigger>
                <TabsTrigger value="meds">
                  <Pill className="h-4 w-4 mr-1" /> Meds
                </TabsTrigger>
                <TabsTrigger value="docs">
                  <FileText className="h-4 w-4 mr-1" /> Docs
                </TabsTrigger>
                {/* <TabsTrigger value="health">
                  <Activity className="h-4 w-4 mr-1" /> Health
                </TabsTrigger> */}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Tab 1: Basic Info */}
          <UserInfoEditTab
            patientId={patient.id}
            initialData={{
              name: patient.name ?? '',
              age: patient.age?.toString() ?? '',
              gender: patient.gender ?? '',
              bloodType: patient?.bloodGroup ?? '',
              relationship: patient.relationship ?? '',
            }}
            onCancel={handleClose}
          />

          {/* Tab 2: Medications */}
          <MedicationsEditTabContent
            patientId={patient.id}
            existingMedications={
              patient.currentMedications?.map((m: any) => ({
                id: m.id ?? String(Math.random()),
                name: m.name ?? '',
                dosage: m.dosage ?? '',
                frequency: m.frequency ?? '',
              })) ?? []
            }
            onCancel={handleClose}
          />

          {/* Tab 3: Documents */}
          <DocumentsEditTabContent
            patientId={patient.id}
            existingDocuments={patient.medicalRecords ?? []}
            onCancel={handleClose}
          />

          {/* Tab 4: Visits */}
          <VisitsEditTabContent patientId={patient.id} onCancel={handleClose} />

          {/* Tab 5: Health Insight */}
          {/* <HealthInsightEditTabContent
            patientId={patient.id}
            onCancel={handleClose}
          /> */}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
