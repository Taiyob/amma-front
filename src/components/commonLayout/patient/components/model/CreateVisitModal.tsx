/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CalendarIcon, Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { format } from 'date-fns';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppButton from '@/components/ui/AppButton';

import AddMedicationDialog from './EditMedicationModal';
import UploadFile from '../upload/useUploade';
import { useAddPreviousPatientVisitWithMedicationMutation } from '@/redux/api/visit.api';
import { toast } from 'sonner';
import { useAppSelector } from '@/redux/hooks';

const medications: any[] = [];

export default function CreateVisitDialog() {
  const id = useId();

  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [currentMedications, setCurrentMedications] = useState(medications);

  const [date, setDate] = useState<Date | undefined>();
  const [purpose, setPurpose] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  // const [diagnosisTag, setDiagnosisTag] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const patientId = useAppSelector((state) => state.patient.selectedPatientId);

  const [createVisitWithMedications, { isLoading: isCreating }] =
    useAddPreviousPatientVisitWithMedicationMutation();

  const handleAddMedication = (newMed: any) => {
    setCurrentMedications((prev) => [...prev, newMed]);
  };

  const handleCreateVisit = async () => {
    if (!patientId) {
      toast.error('Patient ID not found. Please select a patient.');
      return;
    }

    if (!date || !purpose || !diagnosis) {
      toast.error(
        'Please fill in all required fields (Date, Purpose, Diagnosis).',
      );
      return;
    }

    const toastId = toast.loading('Creating visit... Please wait.');

    try {
      const visitData = {
        patientId,
        visitDate: date.toISOString(),
        diagnosis,
        visitPurpose: purpose,
        // diagnosisTag: diagnosisTag || undefined,
      };

      const medicationsData = currentMedications.map((med) => ({
        patientId,
        medicationName: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        timing: med.times,
        duration: med.duration,
        prescribedBy: med.prescribedBy,
        specialInstructions: med.specialInstructions,
      }));

      const payload = {
        visit: visitData,
        medications: medicationsData,
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(payload));

      documents.forEach((file) => {
        formData.append('visitDocuments', file);
      });

      const response = await createVisitWithMedications(formData).unwrap();

      if (response?.success) {
        toast.success('Visit and medications created successfully!', {
          id: toastId,
        });
        setIsModalOpen(false);
        // Reset state
        setDate(undefined);
        setPurpose('');
        setDiagnosis('');
        // setDiagnosisTag('');
        setDocuments([]);
        setCurrentMedications([]);
      }
    } catch (error: any) {
      console.error('Error creating visit:', error);
      toast.error(error?.data?.message || 'Failed to create visit.', {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <AppButton
          textColor="text-background"
          label="Create a visit"
          bgColor="hover:bg-secondary bg-secondary"
        />
      </DialogTrigger>

      <DialogContent className="p-0 sm:max-w-6xl overflow-hidden">
        {/* Header */}
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-base">Create a Visit</DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="grid max-h-[80vh] grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-3">
          {/* LEFT FORM */}
          <div className="space-y-4 md:col-span-2">
            {/* Visit Date */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-date`}>Visit Date</Label>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!date && 'text-muted-foreground'
                      }`}>
                    <CalendarIcon className="mr-2 h-4 w-4 text-secondary" />

                    {date ? format(date, 'PPP') : 'Pick a visit date'}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setOpen(false);
                    }}
                    className="rounded-md border text-secondary"
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${id}-purpose`}>Visit Purpose</Label>
              <Textarea
                id={`${id}-purpose`}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Share your visit purpose..."
              />
            </div>

            {/* Diagnostics */}
            <div className="space-y-2">
              <Label htmlFor={`${id}-diagnostics`}>Diagnostics</Label>
              <Textarea
                id={`${id}-diagnostics`}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Write here..."
              />
            </div>

            {/* Diagnostics Tag */}
            {/* <div className="space-y-2">
              <Label htmlFor={`${id}-tag`}>Diagnostics Tag</Label>
              <Input
                id={`${id}-tag`}
                value={diagnosisTag}
                onChange={(e) => setDiagnosisTag(e.target.value)}
              />
            </div> */}

            {/* Upload */}
            <div className="rounded-lg border border-dashed p-6 text-center">
              <UploadFile onChange={(files) => setDocuments(files)} />
            </div>
          </div>

          {/* RIGHT MEDICATION LIST */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Medications</h3>
              <Button
                onClick={() => setIsAddMedModalOpen(true)}
                variant={'secondary'}
                className="text-white font-normal">
                <Plus /> Add Medication
              </Button>
            </div>

            {currentMedications.map((med, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-lg border border-blue-200 bg-blue-50 p-4 hover:bg-blue-100">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {med.patient}
                    </p>
                  </div>

                  <div className="text-right text-xs">
                    <p>{med.frequency}</p>
                    <p className="text-muted-foreground">
                      Duration: {med.duration}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  {med.times.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-md bg-blue-200 px-2 py-1 text-xs text-blue-900">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            disabled={isCreating}
            onClick={handleCreateVisit}
            className="bg-secondary text-background hover:bg-secondary">
            {isCreating ? 'Creating...' : 'Create Visit'}
          </Button>
        </DialogFooter>
      </DialogContent>

      <AddMedicationDialog
        open={isAddMedModalOpen}
        onOpenChange={setIsAddMedModalOpen}
        onAdd={handleAddMedication}
      />
    </Dialog>
  );
}
