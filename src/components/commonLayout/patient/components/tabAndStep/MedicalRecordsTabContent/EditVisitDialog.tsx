/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { parseBloodGlucose } from '@/lib/vitalUtils';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { useUpdatePreviousPatientVisitMutation } from '@/redux/api/visit.api';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visit: any;
}

interface VisitForm {
  date?: Date;
  purpose: string;
  diagnosis: string;
  diagnosisTag: string;
  weight: string;
  bloodGlucose: string;
  systolic: string;
  diastolic: string;
}

export default function EditVisitDialog({ open, onOpenChange, visit }: Props) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [form, setForm] = useState<VisitForm>({
    date: undefined,
    purpose: '',
    diagnosis: '',
    diagnosisTag: '',
    weight: '',
    bloodGlucose: '',
    systolic: '',
    diastolic: '',
  });

  const [updateVisit, { isLoading }] = useUpdatePreviousPatientVisitMutation();

  useEffect(() => {
    if (visit) {
      setForm({
        date: visit?.visitDate ? new Date(visit.visitDate) : undefined,
        purpose: visit?.visitPurpose || '',
        diagnosis: visit?.diagnosis || '',
        diagnosisTag: visit?.diagnosisTag || '',
        weight: visit?.weight || '',
        bloodGlucose: (() => {
          const { numValue, isMmol } = parseBloodGlucose(visit?.bloodGlucose);
          const mmolValue = isMmol ? numValue : numValue / 18.0182;
          return numValue === 0 ? '' : mmolValue.toFixed(1);
        })(),
        systolic: visit?.systolic || '',
        diastolic: visit?.diastolic || '',
      });
    }
  }, [visit]);

  const handleUpdate = async () => {
    const toastId = toast.loading('Updating visit...');

    try {
      const formData = new FormData();

      formData.append('visitDate', form.date?.toISOString() || '');
      formData.append('visitPurpose', form.purpose);
      formData.append('diagnosis', form.diagnosis);
      formData.append('diagnosisTag', form.diagnosisTag);
      formData.append('weight', form.weight);
      formData.append('bloodGlucose', form.bloodGlucose ? (() => {
        const { numValue, isMmol } = parseBloodGlucose(form.bloodGlucose);
        return isMmol ? (numValue * 18.0182).toFixed(0) : numValue.toFixed(0);
      })() : '');
      formData.append('systolic', form.systolic);
      formData.append('diastolic', form.diastolic);

      const res = await updateVisit({
        id: visit?.id,
        formData,
      }).unwrap();

      if (res?.success) {
        toast.success('Visit updated successfully', { id: toastId });
        onOpenChange(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Update failed', { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Visit</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Visit Date */}
          <div className="space-y-2">
            <Label>Visit Date</Label>

            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {form.date ? format(form.date, 'PPP') : 'Pick date'}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.date}
                  onSelect={(d) => {
                    setForm((prev) => ({ ...prev, date: d }));
                    setCalendarOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <Label>Visit Purpose</Label>
            <Textarea
              value={form.purpose}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, purpose: e.target.value }))
              }
            />
          </div>

          {/* Diagnosis */}
          <div className="space-y-2">
            <Label>Diagnosis</Label>
            <Textarea
              value={form.diagnosis}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, diagnosis: e.target.value }))
              }
            />
          </div>

          {/* Diagnosis Tag */}
          <div className="space-y-2">
            <Label>Diagnosis Tag</Label>
            <Input
              value={form.diagnosisTag}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, diagnosisTag: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Weight */}
            <div className="space-y-2">
              <Label>Weight (KG)</Label>
              <Input
                type="text"
                value={form.weight}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, weight: e.target.value }))
                }
              />
            </div>

            {/* Blood Glucose */}
            <div className="space-y-2">
              <Label>Blood Glucose (mmol/L)</Label>
              <Input
                type="text"
                value={form.bloodGlucose}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, bloodGlucose: e.target.value }))
                }
              />
            </div>

            {/* Systolic */}
            <div className="space-y-2">
              <Label>Systolic</Label>
              <Input
                type="text"
                value={form.systolic}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, systolic: e.target.value }))
                }
              />
            </div>

            {/* Diastolic */}
            <div className="space-y-2">
              <Label>Diastolic</Label>
              <Input
                type="text"
                value={form.diastolic}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, diastolic: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            disabled={isLoading}
            onClick={handleUpdate}
            className="bg-secondary hover:bg-secondary/80 text-white">
            {isLoading ? 'Updating...' : 'Update Visit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
