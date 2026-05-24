/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import {parseBloodGlucose} from '@/lib/vitalUtils';

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateCareRequestAdminMutation } from '@/redux/api/care.api';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visit: any;
}

export default function EditCareRequestDialog({
  open,
  onOpenChange,
  visit,
}: Props) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [form, setForm] = useState({
    scheduledDate: undefined as Date | undefined,
    preferredTime: '',
    priority: '',
    symptomsDescription: '',
    bloodPressure: '',
    bloodGlucose: '',
    weight: '',
    specialInstructions: '',
    summary: '',
    systolic: '',
    diastolic: '',
    // status: 'ongoing',
  });

  const [updateCareRequest, { isLoading }] = useUpdateCareRequestAdminMutation();

  useEffect(() => {
    if (visit) {
      setForm({
        scheduledDate: visit?.scheduledDate
          ? new Date(visit.scheduledDate)
          : undefined,
        preferredTime: visit?.preferredTime || '',
        priority: visit?.priority || '',
        symptomsDescription: visit?.symptomsDescription || '',
        bloodPressure: visit?.bloodPressure || '',
        bloodGlucose: (() => {
          const {numValue, isMmol} = parseBloodGlucose(visit?.bloodGlucose);
          const mmolValue = isMmol ? numValue : numValue / 18.0182;
          return numValue === 0 ? '' : mmolValue.toFixed(1);
        })(),
        weight: visit?.weight || '',
        specialInstructions: visit?.specialInstructions || '',
        summary: visit?.summary || '',
        systolic: visit?.systolic || '',
        diastolic: visit?.diastolic || '',
        // status: visit?.status || 'ongoing',
      });
    }
  }, [visit]);

  const handleUpdate = async () => {
    const toastId = toast.loading('Updating care request...');

    try {
      const payload = {
        scheduledDate: form.scheduledDate?.toISOString(),
        preferredTime: form.preferredTime,
        symptomsDescription: form.symptomsDescription,
        specialInstructions: form.specialInstructions,
        bloodPressure: `${form.systolic}/${form.diastolic} mmHg`,
        bloodGlucose: form.bloodGlucose ? (() => {
          const {numValue, isMmol} = parseBloodGlucose(form.bloodGlucose);
          // Store as mg/dL if it was mmol/L, or keep as is if it's already numeric/string
          return isMmol ? (numValue * 18.0182).toFixed(0) : numValue.toFixed(0);
        })() : '',
        weight: form.weight,
        systolic: form.systolic ? Number(form.systolic) : undefined,
        diastolic: form.diastolic ? Number(form.diastolic) : undefined,
        // status: form.status,
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(payload));

      const res = await updateCareRequest({
        id: visit?._id || visit?.id,
        formData: formData,
      }).unwrap();

      if (res?.success) {
        toast.success('Care request updated successfully', { id: toastId });
        onOpenChange(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Update failed', { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Care Request (Admin)</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">

          {/* Scheduled Date */}
          <div className="space-y-2">
            <Label>Scheduled Date</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-muted-foreground/20">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.scheduledDate
                    ? format(form.scheduledDate, 'PPP')
                    : 'Pick date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.scheduledDate}
                  onSelect={(d) => {
                    setForm((prev) => ({ ...prev, scheduledDate: d }));
                    setCalendarOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>


          {/* Status */}
          {/* <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(val) =>
                setForm((prev) => ({ ...prev, status: val }))
              }>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}


          {/* Preferred Time */}
          <div className="space-y-2">
            <Label>Preferred Time</Label>
            <Select
              value={form.preferredTime}
              onValueChange={(val) =>
                setForm((prev) => ({ ...prev, preferredTime: val }))
              }>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Afternoon">Afternoon</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>



          <h3 className="col-span-2 text-lg font-semibold mt-4 text-secondary border-r border-secondary">Vital Signs</h3>

          {/* Blood Glucose */}
          <div className="space-y-2">
            <Label>Blood Glucose (mmol/L)</Label>
            <Input
              value={form.bloodGlucose}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, bloodGlucose: e.target.value }))
              }
              placeholder="e.g. 6.1 mmol/L"
            />
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label>Weight</Label>
            <Input
              value={form.weight}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, weight: e.target.value }))
              }
              placeholder="e.g. 72"
            />
          </div>

          {/* BP - Systolic */}
          <div className="space-y-2">
            <Label>Systolic (mmHg)</Label>
            <Input
              type="number"
              value={form.systolic}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, systolic: e.target.value }))
              }
              placeholder="e.g. 135"
            />
          </div>

          {/* BP - Diastolic */}
          <div className="space-y-2">
            <Label>Diastolic (mmHg)</Label>
            <Input
              type="number"
              value={form.diastolic}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, diastolic: e.target.value }))
              }
              placeholder="e.g. 85"
            />
          </div>

          {/* Symptoms */}
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label>Symptoms / Complaint</Label>
            <Textarea
              value={form.symptomsDescription}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  symptomsDescription: e.target.value,
                }))
              }
              placeholder="Severe cough and mild fever..."
            />
          </div>

          {/* Special Instructions */}
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label>Special Instructions</Label>
            <Textarea
              value={form.specialInstructions}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  specialInstructions: e.target.value,
                }))
              }
              placeholder="Patient has allergy to dust..."
            />
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleUpdate}
            className="bg-secondary hover:bg-secondary/80 text-white min-w-30">
            {isLoading ? 'Updating...' : 'Update Care Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
